import { Component, OnInit, Input, HostListener, ViewChildren} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ResultService } from '../../service/result.service';
import { SearchModule } from '../../logic/search-module';
import { SearchModuleService } from '../../service/search-module.service.ts';
import { SearchResultsComponent} from '../searchresults/searchresults.component.ts';

import { Util } from '../../util';


@Component({
    selector: 'searchmodules',
    templateUrl: './searchmodules.component.html',
    styles: [String(require('./searchmodules.component.less'))],
    providers: [ResultService]
})
export class SearchModulesComponent implements OnInit {

    @Input('query') query: string;

    @ViewChildren('lastTab') lastTab;
    @ViewChildren('lastIcon') lastIcon;
    @ViewChildren('measureWidth') measureWidth;


    searchModules: SearchModule[];
    searchModulesLoaded: boolean = false;
    selectedSearchModule: SearchModule;
    shownModules: SearchModule[];

    static iframeContent: string = require('./iframeContent.html');

    constructor(
        private searchModuleService: SearchModuleService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.searchModuleService.getSearchModulesSlowly(this.query)
            // load results
            .then((modules) => {
                modules = Util.addSecrets(modules);
                this.searchModules = modules;
                this.searchModulesLoaded = true;
                this.selectedSearchModule = this.searchModules[0];
                this.loadSelectedModule();
                this.showSearchResults();
                this.getShownModules();
                this.selectedSearchModule = this.shownModules[0];
                /**
                 * TODO this is a workarround because none of the lifecycle-hooks
                 * is fired after the onInint-promise and after the html-rendering
                 * @link https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
                 */
                setTimeout(() => { this.toggleEllipsis(null); }, 0);
            });
    }

    getShownModules() {
        this.shownModules = [];
        //returns arrays of all modules that will be shown
        for (let searchModule of this.searchModules) {
            if (!searchModule.smallDisplayOnly ||
              (this.isSmallDisplay && searchModule.smallDisplayOnly))
                this.shownModules.push(searchModule);
        };
    }


    /**
     * window-keys
     */
    @HostListener('window:keydown', ['$event'])
    onWindowKey(event) {

        if (event.code == 'ArrowLeft') {
            let nextIndex = this.selectedSearchModule.index - 1;
            this.selectedSearchModule = this.searchModules[nextIndex];
            if (!this.selectedSearchModule) { this.selectedSearchModule = this.searchModules[this.searchModules.length - 1]; }
            this.loadSelectedModule();
        }

        if (event.code == 'ArrowRight') {
            let nextIndex = this.selectedSearchModule.index + 1;
            this.selectedSearchModule = this.searchModules[nextIndex];
            if (!this.selectedSearchModule) { this.selectedSearchModule = this.searchModules[0]; }
            this.loadSelectedModule();
        }
    }


    /**
     * handle the postMessages from the iframes
     */
    @HostListener('window:message', ['$event'])
    onFrameMessage(event) {
        let dat = event.data.data;

        // get module by the secret
        let target: SearchModule = null;
        this.searchModules.forEach((mod) => {
            if (mod.secret == event.data.secret) {
                target = mod;
            }
        });
        if (!target) {
            console.log('cant find searchModule with secret ' + event.data.secret);
            return;
        }

        let isSelected = (target == this.selectedSearchModule);

        switch (event.data.type) {
            case 'SET_HEIGHT':
                let newHeight = parseInt(dat);
                target.height = newHeight;
                break;

            case 'SCROLL_TOP':
                if (isSelected) {
                    Util.scrollToTop();
                }
                break;

            case 'DOCUMENT_KEYDOWN':
                Util.simulateKeydown(dat.code, dat.key, dat.ctrlKey, document);
                break;

            case 'LOADED':
                break;

            default:
                console.dir('SearchModulesComponent.onFrameMessage() no handler for type: ' + event.data.type);
                console.log('send by:');
                console.dir(target);
                break;
        }
    }

    selectModule(mod: SearchModule) {
        this.selectedSearchModule = mod;
        this.loadSelectedModule();
    }

    loadSelectedModule() {
        Util.scrollToTop();
        if (this.selectedSearchModule.content) {

        } else {
            this.selectedSearchModule.getContent()
                .then((content) => {
                    let wholeContent = SearchModulesComponent.iframeContent.replace(/\|content\|/, content);
                    wholeContent = wholeContent.replace(/\|secret\|/, this.selectedSearchModule.secret);

                    this.selectedSearchModule.content = this.sanitizer.bypassSecurityTrustHtml(wholeContent);
                });
        }
    }


    showTabTitle: boolean = true;
    @HostListener('window:resize', ['$event'])
    toggleEllipsis(event) {
        try {
            let iconWidth = this.lastIcon.first.nativeElement.offsetWidth;
            let minSpace = iconWidth + 20;
            let tabWidth = this.lastTab.first.nativeElement.clientWidth;
            if (tabWidth - minSpace <= iconWidth) {
                this.showTabTitle = false;
            } else {
                this.showTabTitle = true;
            }
        } catch (e) {
            // console.warn('searchmodules.toggleEllipsis called to early');
            // console.dir(e);
        }
    }

    isSmallDisplay: boolean = false;
    @HostListener('window:resize', ['$event'])
    showSearchResults() {
        const width = this.measureWidth.first.nativeElement.offsetWidth;
        let windowWidth = window.innerWidth;
        if (width > windowWidth / 2) this.isSmallDisplay = true;
        else this.isSmallDisplay = false;
        this.getShownModules();
        if(!this.isSmallDisplay && this.selectedSearchModule.smallDisplayOnly) {
          this.selectedSearchModule = this.shownModules[0];
        }
    }

}
