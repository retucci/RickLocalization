import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dimension } from 'src/app/_models/Dimension';
import { DimensionService } from 'src/app/_services/dimension.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  dimensions: Dimension[];
  originalDimension: Dimension;
  id = 0;
  code: string;

  constructor(
    private dimensionService: DimensionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadDimensions();
  }

  loadDimensions() {
    if (!this.route.snapshot.paramMap.has('id')) {
      this.id = 0;
      return;
    }

    if (!Number(this.route.snapshot.paramMap.get('id')) || Number(this.route.snapshot.paramMap.get('id')) <= 0) {
      this.id = 0;
      this.toastr.warning('Não foi possível recuperar as Dimensões', 'Editar');
      return;
    }

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id > 0)  {
      this.dimensionService.getDimensionsByRickId(this.id).subscribe((dimensions: any) => {
          this.dimensions = dimensions;
          this.originalDimension = dimensions[0];
      }, error => {
         this.toastr.error('Não foi possível recuperar as Dimensões', 'Editar');
      });
    } else {
      this.toastr.warning('Não foi possível recuperar as Dimensões', 'Editar');
    }
  }
}
