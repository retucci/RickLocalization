import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { Dimension } from '../_models/Dimension';
import { Rick } from '../_models/Rick';
import { DimensionService } from '../_services/dimension.service';
import { RickService } from '../_services/rick.service';

import { ToastrService } from 'ngx-toastr';

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

  imageURL = 'assets/img/upload.png';
  file: File;

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
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      image: [''],
      qi: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
      morty: this.formBuilder.group({
        id: [0],
        name: ['', [Validators.required, Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.maxLength(255)]],
      }),
      dimensions: this.formBuilder.array([]) // TODO: Adicionar no validator só a posição 1
      //  dimensions: this.formBuilder.array([]).push(this.formBuilder.group({
      //     id: [0],
      //     original: [1],
      //     code: ['', [Validators.required, Validators.maxLength(4)]],
      //  }))
    });
  }

  createDimension(dimension: any): FormGroup {
    return this.formBuilder.group({
        id: [dimension.id],
        original: [1],
        code: ['', [Validators.required, Validators.maxLength(4)]],
     });
  }

  addDimension() {
    this.dimensions.push(this.createDimension({ id: 0, code: '', original: 1 }));
  }

  loadRick() {

    if (!this.route.snapshot.paramMap.has('id')) {
        this.id = 0;
        return;
    }

    if (!Number(this.route.snapshot.paramMap.get('id')) || Number(this.route.snapshot.paramMap.get('id')) <= 0) {
      this.id = 0;
      this.toastr.warning('Não foi possível recuperar o Rick', 'Editar');
      return;
    }

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id > 0)  {
        this.rickService.getRicksById(this.id).subscribe((rick: Rick) => {
          if (rick != null) {
            this.rick = Object.assign({}, rick);
            this.registerForm.patchValue(rick);
            if (this.rick.image !== '') {
              this.imageURL = environment.apiURL + 'Images/' + this.rick.image;
            }
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
      if (code !== undefined) {
        const dimension = new Dimension();
        dimension.code = code;
        dimension.original = 0;
        dimension.rickId = this.rick.id;
        const dateTime = new Date();
        dimension.travelDate = new Date(dateTime.valueOf() - dateTime.getTimezoneOffset() * 60000);

        this.dimensionService.postDimension(dimension).subscribe(
          (newDimension: Dimension) => {
             this.toastr.success('Viagem adicionada com sucesso!', 'Salvar');
          }, error => {
             this.toastr.error('Erro ao adicionar viagem', 'Salvar');
          }
        );
      }
    });
  }

  onFileChange(ev: any) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imageURL = event.target.result;
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);
    this.uploadImage();
  }

  uploadImage() {
    this.rickService.postUpload(this.id, this.file).subscribe(
      () => {
        this.toastr.success('Imagem atualziada com sucesso!', 'Salvar');
        this.router.navigate([ 'rick/', this.id, 'detail']);
      },
      (error: any) => {
        this.toastr.error('Erro ao realizar upload', 'Salvar');
      },
    );
  }
}

export interface DialogData {
  code: string;
}

@Component({
  selector: 'app-rick.dimension.component',
  templateUrl: 'rick.dimension.component.html',
})
export class RickDimensionComponent implements OnInit {
  dialogForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<RickDimensionComponent>,
              public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.dialogForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(4)]]
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
