import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ResultsComponent} from "./pages/results/results.component";

import {TestComponent} from "./pages/test/test.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'test',
        component: TestComponent
    },
    {
        path: 'results/:query',
        component: ResultsComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);
