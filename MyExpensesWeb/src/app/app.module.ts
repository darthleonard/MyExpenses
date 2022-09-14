import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestComponent } from './components/latest/latest.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SummatoryComponent } from './components/summatory/summatory.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewerComponent } from './components/newer/newer.component';
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LatestComponent,
    DashboardComponent,
    SummatoryComponent,
    NavbarComponent,
    NewerComponent,
    Dashboard2Component,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
