import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';

import { Rick } from '../_models/Rick';
import { RickService } from '../_services/rick.service';

import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  rick: Rick;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  ricks: Rick[];

  length = 0;
  pageSize = 4;
  pageSizeOptions: number[] = [3, 4, 5];
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private rickService: RickService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getRicks();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
        this.pageSize = this.paginator.pageSize;
        this.rickService.getRicks(this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe((response: any) => {
          this.ricks = response.rickDtos;
          this.length = response.pagination.totalCount;
        }, error => { console.log(error); });
    });
  }

  getRicks() {
    this.rickService.getRicks(1, this.pageSize).subscribe((response: any) => {
      this.ricks = response.rickDtos;
      this.length = response.pagination.totalCount;
    }, error => { console.log(error); });
  }

  getImage(imageURL: string) {
    return imageURL !== '' ? `${environment.apiURL}Images/${imageURL}` : `${environment.apiURL}Images/rick_and_morty.png`;
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DashboardDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rickService.deleteRick(id).subscribe(
          () => {
              this.getRicks();
              this.toastr.success('Excluído com sucesso!', 'Excluir');
            }, error => {
              this.toastr.error('Erro ao Excluir', 'Excluir');
            }
        );
      }
    });
  }
}

@Component({
  selector: 'app-dashboard.dialog.component',
  templateUrl: 'dashboard.dialog.component.html',
})
export class DashboardDialogComponent {}
