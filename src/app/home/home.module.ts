import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';

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
    SplitButtonModule,
    DropdownModule
  ]
})
export class HomeModule { }
