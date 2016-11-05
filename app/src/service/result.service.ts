import { Result } from '../logic/result';
import { Injectable } from '@angular/core';
import { Util } from '../util';

@Injectable()
export class ResultService {


    getResults(searchTerm: string): Promise<Result[]> {

        let gen = [];
        for (let t = 0; t < 10; t++) {
            gen.push(new Result(
                'url',
                searchTerm + ' homo sapiens ' + t,
                'Berlin Zum Anhören bitte klicken! [bɛɐ̯ˈliːn] ist die Bundeshauptstadt der Bundesrepublik Deutschland und zugleich eines ihrer Länder. Die Stadt Berlin ist ... ',
                'http://www.google.com/asdflkadfsjasdf'
            ));
        }

        return Promise.resolve(Util.numberate(gen));
    }

    getResultsSlowly(searchTerm: string): Promise<Result[]> {
        return new Promise<Result[]>(resolve =>
            setTimeout(resolve, 1000)) // delay
            .then(() => this.getResults(searchTerm));
    }
}
