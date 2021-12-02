import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { AuthModule } from './auth/auth.module';
// import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    ProgressSpinnerModule,
    HttpClientModule,
    CardModule,
    // AuthModule,
    // HomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('token');
        },
        disallowedRoutes: [
          'http://localhost:3000/contacts/register',
          'http://localhost:3000/contacts/login',
        ],
        allowedDomains: ['localhost:3000'],
        authScheme: 'Bearer ',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
