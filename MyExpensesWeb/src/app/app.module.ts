import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestComponent } from './components/latest/latest.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SummatoryComponent } from './components/summatory/summatory.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewerComponent } from './components/newer/newer.component';

@NgModule({
  declarations: [
    AppComponent,
    LatestComponent,
    DashboardComponent,
    SummatoryComponent,
    NavbarComponent,
    NewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
