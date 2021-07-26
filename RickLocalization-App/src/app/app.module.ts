import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './app.material.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent, DashboardDialogComponent } from './dashboard/dashboard.component';
import { RickComponent, RickDimensionComponent } from './rick/rick.component';
import { HistoryComponent } from './rick/history/history.component';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DashboardComponent, DashboardDialogComponent,
    RickComponent, RickDimensionComponent,
    HistoryComponent
   ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [ ],
  providers: [ ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
