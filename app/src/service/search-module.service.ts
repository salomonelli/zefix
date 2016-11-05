import { Injectable } from '@angular/core';

import { Result } from '../logic/result';
import { SearchModule } from '../logic/search-module';
import { Util } from '../util';


@Injectable()
export class SearchModuleService {

    getSearchModules(searchTerm: string): Promise<SearchModule[]> {

        const modules = [
            new SearchModule(
                'search',
                'anyprovider',
                'blabla',
                '#006C61'
            ),
            new SearchModule(
                'youtube',
                'anyprovider1',
                'http://youtube.com/favicon.ico',
                '#b5100a'
            ),
            new SearchModule(
                'wikipedia',
                'anyprovider2',
                'https://en.wikipedia.org/favicon.ico',
                '#d3d3d3'
            ),
            new SearchModule(
                'amazon',
                'anyprovider3',
                'https://www.amazon.de/favicon.ico',
                '#ffa700'
            )
        ];

        modules[0].smallDisplayOnly = true;
        return Promise.resolve(Util.numberate(modules));
    }

    getSearchModulesSlowly(searchTerm: string): Promise<SearchModule[]> {
        return new Promise<SearchModule[]>(resolve =>
            setTimeout(resolve, 1000)) // delay
            .then(() => this.getSearchModules(searchTerm));
    }
}
