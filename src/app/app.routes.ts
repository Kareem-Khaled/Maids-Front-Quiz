import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/:userId',
        component: UserDetailsComponent
    },
    {
        path: '',
        component: UserListComponent,
        pathMatch: 'full'
    }
];
