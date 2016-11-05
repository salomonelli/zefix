import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule }   from '@angular/forms';

import {
    APP_BASE_HREF,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy
} from '@angular/common';



/**
 * STYLES
 */
require("normalize.css");
require("../../node_modules/font-awesome/css/font-awesome.min.css");

// new docs at http://v4-alpha.getbootstrap.com/layout/overview/
require("../../node_modules/bootstrap/dist/css/bootstrap-grid.css");

require("./styles.global.less");
/**
 * PAGES
 */
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { ResultsComponent } from './pages/results/results.component';

/**
 * COMPONENTS
 */
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SearchResultsComponent } from './components/searchresults/searchresults.component';
import { SearchModulesComponent } from './components/searchmodules/searchmodules.component';

/**
 * SERVICES
 */
import { SuggestService } from './service/suggest.service';
import { ResultService } from './service/result.service';
import { SearchModuleService } from './service/search-module.service';
import { FaviconService } from './service/favicon.service';


/**
 * material2
 * @link https://github.com/jelbourn/material2-app/blob/master/src/main.ts
 * @link https://github.com/jelbourn/material2-app/blob/master/src/app/material2-app.component.html
 */
import {MdCardModule} from '@angular2-material/card/card';
import {MdCheckboxModule} from '@angular2-material/checkbox/checkbox';
import {MdTabsModule} from '@angular2-material/tabs';
/** @link https://github.com/angular/material2/blob/master/src/lib/input/README.md */
import {MdInputModule} from '@angular2-material/input/input';
import {MdButtonModule} from '@angular2-material/button/button';
import {MdProgressCircleModule} from '@angular2-material/progress-circle/progress-circle';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        MdCardModule,
        MdCheckboxModule,
        MdInputModule,
        MdButtonModule,
        MdProgressCircleModule,
        MdTabsModule
    ],
    providers: [
        SuggestService,
        ResultService,
        SearchModuleService,
        FaviconService,
        appRoutingProviders,
        { provide: APP_BASE_HREF, useValue: '/' },

        /**
         * if its a local file, the HashLocationStrategy must be used
         */
        {
            provide: LocationStrategy,
            useClass: window.location.href.split('/')[0] == 'file:' ? HashLocationStrategy : PathLocationStrategy
        },
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ResultsComponent,
        TestComponent,
        SearchboxComponent,
        SearchResultsComponent,
        SearchModulesComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
