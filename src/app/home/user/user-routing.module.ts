import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chats',
        component: ContactsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path:"contact-list",
        component:AllContactsComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'chats' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
