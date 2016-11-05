import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ResultService } from '../../service/result.service';
import { FaviconService } from '../../service/favicon.service';
import { Result } from '../../logic/result';
import { Util } from '../../util';

@Component({
    selector: 'searchresults',
    templateUrl: './searchresults.component.html',
    styles: [String(require('./searchresults.component.less'))],
    providers: [ResultService]
})
export class SearchResultsComponent implements OnInit {

    @Input('query') query: string;

    results: Result[];
    resultsLoaded: boolean = false;
    selectedResult: Result;

    constructor(
        private resultService: ResultService,
        private faviconService: FaviconService
    ) { }

    ngOnInit() {
        this.resultService.getResultsSlowly(this.query)
            // load results
            .then((results) => {
                this.results = results;
                this.resultsLoaded = true;
            })
            .then(() => {
                // load urlIcons
                this.results.forEach((result) => {
                    this.faviconService.getFaviconURLSlowly(result.url).then((urlIcon) => {
                        result.urlIcon = urlIcon;
                    });
                });
            });
    }


    /**
     */
    @HostListener('document:keydown', ['$event'])
    onTabKeyFocusFirst(event) {

        // if the tab-key is pressed and no result is focused, focus the first result
        if (event.code == 'Tab' && !this.selectedResult) {
            this.selectedResult = this.results[0];
        }


        // TODO when next is selected, scroll so its vissible
        // if a result is selected, focus the next one
        if (event.code == 'ArrowDown' && this.selectedResult) {
            let nextIndex = this.selectedResult.index + 1;
            this.selectedResult = this.results[nextIndex];
            if (!this.selectedResult) this.selectedResult = this.results[0];
        }

        // if a result is selected, focus the previous on
        if (event.code == 'ArrowUp' && this.selectedResult) {
            let nextIndex = this.selectedResult.index - 1;
            this.selectedResult = this.results[nextIndex];
            if (!this.selectedResult) this.selectedResult = this.results[this.results.length - 1];
        }
    }


    gotoMoving: boolean = false; // true if currently location is changing
    goto(url: string) {

        /**
         * if a clickable inside of a clickable is clicked, than make sure that only the first goto is used
         */
        if (this.gotoMoving) {
            return;
        } else {
            this.gotoMoving = true;
            setTimeout(() => { this.gotoMoving = false; }, 100);
        }
        if (Util.isMobile()) {
            Util.openInNewTab(url);
        } else {
            window.location.href = url;
        }
    }


    clickResult(result: Result, event) {
        // console.log('clickResult');
        // console.dir(event);

        // check if text-selection was made
        let selection = window.getSelection();
        let selecionElement = selection.focusNode.parentElement;
        if (
            selection.type != 'Range' ||
            selecionElement != event.srcElement
        ) {
            this.goto(result.url);
        }
    }

    // TOOLS
    tool_archive(result: Result) {
        console.log('click tool_archive');
        let goal = 'https://web.archive.org/web/*/' + result.url;
        this.goto(goal);
    }

    tool_proxy(result: Result) {
        console.log('click tool_proxy');
    }

    
}
