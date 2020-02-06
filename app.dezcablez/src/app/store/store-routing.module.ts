import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';


const routes: Routes = [
    {
        path: 'store',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: StoreComponent
            }
        ]   
    }
];

export const StoreRoutingModule  = RouterModule.forChild(routes);
