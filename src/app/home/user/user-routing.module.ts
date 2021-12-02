import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contact-list',
        component: ContactsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: '', pathMatch: 'full', redirectTo: 'contact-list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
