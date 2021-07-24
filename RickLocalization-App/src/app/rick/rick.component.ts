import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Dimension } from '../_models/Dimension';
import { Rick } from '../_models/Rick';
import { DimensionService } from '../_services/dimension.service';
import { RickService } from '../_services/rick.service';

@Component({
  selector: 'app-rick',
  templateUrl: './rick.component.html',
  styleUrls: ['./rick.component.css']
})
export class RickComponent implements OnInit {

  rick: Rick;
  dimension: Dimension;
  registerForm: FormGroup;
  id = 0;
  code: string;

  get mortys(): FormArray {
    return this.registerForm.get('mortys') as FormArray;
  }
  get dimensions(): FormArray {
    return this.registerForm.get('dimensions') as FormArray;
  }

  constructor(
    private rickService: RickService,
    private dimensionService: DimensionService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.validation();
    this.loadRick();
    this.addDimension();
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      qi: [0],
      morty: this.formBuilder.group({
        id: [0],
        name: ['', Validators.required],
        description: ['', Validators.required],
        image: [''],
      }),
      dimensions: this.formBuilder.array([]) // TODO: Add apenas um
    });
  }

  createDimension(dimension: any): FormGroup {
    return this.formBuilder.group({
        id: [dimension.id],
        code: ['', Validators.required]
     });
  }

  addDimension() {
    this.dimensions.push(this.createDimension({ id: 0, code: '' }));
  }

  loadRick() {

    if (!this.route.snapshot.paramMap.has('id')) {
        this.id = 0;
        return;
    }

    if (!Number(this.route.snapshot.paramMap.get('id')) || Number(this.route.snapshot.paramMap.get('id')) <= 0) {
      this.id = 0;
      this.toastr.warning('Não foi possível recuperar o Cliente', 'Editar');
      return;
    }

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id > 0)  {
        this.rickService.getRicksById(this.id).subscribe((rick: Rick) => {
          if (rick != null) {
            this.rick = Object.assign({}, rick);
            this.registerForm.patchValue(rick);
            // this.rick.mortys.forEach(morty =>{
            //     this.mortys.push(this.createMorty(morty));
            // });
          } else {
              this.toastr.warning('Não foi possível recuperar o Rick', 'Editar');
              this.id = 0;
          }
        }, error => {
           this.toastr.error('Não foi possível recuperar o Rick', 'Editar');
        });
    }
  }

  saveRick() {
    if (this.registerForm.valid) {
      if (this.id === 0) {
        this.rick = Object.assign({}, this.registerForm.value);
        this.rickService.postRick(this.rick).subscribe(
          (newRick: Rick) => {
            this.toastr.success('Salvo com sucesso!', 'Salvar');
            this.id = newRick.id;
            this.router.navigate([ 'rick/', this.id, 'detail']);
          }, error => {
            this.toastr.error('Erro ao Salvar', 'Salvar');
          }
        );
       } else {
        this.rick = Object.assign({id: this.rick.id}, this.registerForm.value);
        this.rickService.putRick(this.rick).subscribe(
          (editedRick: Rick) => {
             this.toastr.success('Editado com sucesso!', 'Editar');
          }, error => {
             this.toastr.error('Erro ao Editar', 'Editar');
          }
        );
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RickDimensionComponent, {
      width: '300px',
      data: {code: this.code}
    });

    dialogRef.afterClosed().subscribe(code => {
        const dimension = new Dimension();
        dimension.code = code;
        dimension.rickId = this.rick.id;
        // dimension.mortyId = this.rick.mortys[0].id;

        this.dimensionService.postDimension(dimension).subscribe(
          (newDimension: Dimension) => {
            this.toastr.success('Salvo com sucesso!', 'Salvar');
          }, error => {
            this.toastr.error('Erro ao Salvar', 'Salvar');
          }
        );
    });
  }
}

export interface DialogData {
  code: string;
}

@Component({
  selector: 'app-rick.dimension.component',
  templateUrl: 'rick.dimension.component.html',
})
export class RickDimensionComponent {

  constructor(public dialogRef: MatDialogRef<RickDimensionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
