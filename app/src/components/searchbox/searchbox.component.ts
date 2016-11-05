import { Component, OnInit, HostListener, ViewChildren, Input } from '@angular/core';
import { SuggestService } from '../../service/suggest.service';
import { Suggest } from '../../logic/suggest';

@Component({
    selector: 'searchbox',
    templateUrl: './searchbox.component.html',
    styles: [String(require('./searchbox.component.less'))],
    providers: [SuggestService]
})
export class SearchboxComponent implements OnInit {


    suggests: Suggest[] = [];
    suggestsLoaded: boolean = false;
    selectedSuggest: Suggest;
    focused: boolean = false;

    @Input('query') query: string = '';
    queryBefore: string;

    @Input('autofocus') autofocus: boolean = false;

    @ViewChildren('input') inputfield;

    constructor(private suggestService: SuggestService) {
        this.query = '';
        this.queryBefore = this.query;
    }

    ngOnInit() {
    }


    /**
     * if a key is pressed and no input is in focus, the searchbox will be focused
     */
    @HostListener('window:keydown', ['$event'])
    focusOnKeypress(event) {
        let focusedEls = document.querySelector(':focus');
        if (
            !focusedEls && // only do sth if no other element is focused
            !event.ctrlKey && // do not focus if ctrl was also hold (copy,paste etc..)
            (
                event.key.length == 1 || // only these keys are 'normal' keyboard-inputs (no enter or arrow-keys)
                event.key == 'Backspace'
            )
            // && event.key != ' ' // not on SPACE // TODO evaluate if this should be done
        ) {
            console.log('SearchboxComponent.focusOnKeypress(' + event.key + ')');
            console.dir(event);
            this.inputfield.first.nativeElement.focus();

            // retype the value if the event is not trusted (=from outside)
            if (!event.isTrusted) {
                switch (event.key) {
                    case 'Backspace':
                        this.query = this.query.substring(0, this.query.length - 1);
                        break;
                    default:
                        this.query = this.query + event.key;
                        break;
                }
            }
        }
    }

    touched(event): void {

        // value-change
        if (this.queryBefore != this.query) {
            // console.log('changed to: ' + this.query);
            this.loadSuggests();
            this.queryBefore = this.query;
        }

        if (event.type == 'keydown') {
            switch (event.code) {
                // suggest-movings
                case 'ArrowDown':
                    this.nextSuggest();
                    break;
                case 'ArrowUp':
                    this.prevSuggest();
                    break;
                // submit
                case 'Enter':
                    this.submit(this.selectedSuggest);
                    break;
                // blur
                case 'Escape':
                    this.inputfield.first.nativeElement.blur();
                    break;
            }
        }
    }

    unfocus() {
        this.focused = false;
    }

    focus() {
        this.focused = true;
        this.loadSuggests();
    }

    loadSuggests() {
        // console.log('load suggests: ' + this.searchTerm);
        this.suggests = [];
        this.suggestsLoaded = false;
        this.selectedSuggest = null;

        /**
         * TODO use getSuggest instead of getSuggestsSlowly
         */
        this.suggestService.getSuggestsSlowly(this.query)
            .then((suggests) => {
                this.suggests = suggests;
                this.suggestsLoaded = true;
            });
    }

    nextSuggest() {
        try {
            let nextIndex = this.selectedSuggest.index + 1;
            this.selectedSuggest = this.suggests[nextIndex];
        } catch (e) {
            this.selectedSuggest = this.suggests[0];
        }
    }

    prevSuggest() {
        try {
            let nextIndex = this.selectedSuggest.index - 1;
            this.selectedSuggest = this.suggests[nextIndex];
        } catch (e) {
            this.selectedSuggest = this.suggests[this.suggests.length - 1];
        }
    }


    submit(suggest: Suggest) {
        console.log('submit');
        console.dir(this.query);
        if (suggest) {
            console.dir(suggest);
        } else {
            // use searchTerm
            console.dir(this.query);
        }
    }



}
