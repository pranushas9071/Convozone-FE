import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ToolbarModule,
  ]
})
export class HomeModule { }
