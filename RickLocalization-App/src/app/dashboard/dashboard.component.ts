import { Component, OnInit } from '@angular/core';
import { Rick } from '../_models/Rick';
import { RickService } from '../_services/rick.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  rick: Rick;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  rick: Rick;
  ricks: Rick[];

  constructor(
    private rickService: RickService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getRicks();
  }

  getRicks() {
    this.rickService.getRicks().subscribe((ricks: Rick[]) => {
      this.ricks = ricks;
    }, error => { console.log(error); });
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
