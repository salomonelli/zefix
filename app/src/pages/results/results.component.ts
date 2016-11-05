import { Component, Input, OnInit, HostListener, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Result } from '../../logic/result.ts';
import { ResultService } from '../../service/result.service.ts';
import { SearchModule } from '../../logic/search-module';
import { SearchModuleService } from '../../service/search-module.service.ts';

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styles: [String(require('./results.component.less'))],
    providers: [
        ResultService,
        SearchModuleService
    ]
})
export class ResultsComponent implements OnInit {

    @Input() query: string;
    @ViewChildren('measureWidth') measureWidth;

    results: Result[];
    resultsLoaded: boolean = false;
    selectedResult: Result;

    searchModules: SearchModule[];
    searchModulesLoaded: boolean = false;
    selectedSearchModule: SearchModule;

    constructor(
        private resultService: ResultService,
        private searchModuleService: SearchModuleService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.query = params['query'];
            this.resultService.getResultsSlowly(params['query'])
                // load results
                .then((results) => {
                    this.results = results;
                    this.resultsLoaded = true;
                    return this.searchModuleService.getSearchModulesSlowly(this.query);
                })
                // load searchModules
                .then((searchModules) => {
                    this.searchModules = searchModules;
                    this.searchModulesLoaded = true;
                    this.selectedSearchModule = searchModules[0];
                    // console.dir(this.selectedSearchModule);
                    // console.log('mods:');
                    // console.dir(searchModules);
                });
        });
    }


    /**
     * if an arrow-key is pressed and no input is in focus, the searchModules will be switched
     */
    @HostListener('document:keydown', ['$event'])
    onKey(event) {
        let focusedEls = document.querySelector(":focus");
        if (!focusedEls) {
            switch (event.code) {
                case 'ArrowRight':
                case 'ArrowLeft':
                case 'ArrowDown':
                case 'ArrowUp':
            }
        }
    }

    searchModulesChange(event) {
        let newIndex = event.index;
        this.selectedSearchModule = this.searchModules[newIndex];
        this.selectedSearchModule.getContent().then((content) => {
            // console.dir(content);
        });
    }

    isSmallDisplay: boolean = false;
    @HostListener('window:resize', ['$event'])
    showSearchResults() {
        const width = this.measureWidth.first.nativeElement.offsetWidth;
        let windowWidth = window.innerWidth;
        if ((width-50) > windowWidth / 2){
          this.isSmallDisplay = true;
        }
        else if (this.isSmallDisplay){
          this.isSmallDisplay = false;
        }
    }

}
