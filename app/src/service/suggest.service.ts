import { Suggest } from '../logic/suggest';
import { Injectable } from '@angular/core';
import { Util } from '../util';

@Injectable()
export class SuggestService {



  getSuggest(searchTerm: string): Promise<Suggest[]> {
    return Promise.resolve(Util.numberate([
      new Suggest('provider', 'searchTerm', { searchTerm: 'alice' }),
      new Suggest('bookmarks', 'url', { url: 'http://www.facebook.com/asdfasdf.html' }),
      new Suggest('history', 'searchTerm', { searchTerm: 'bob' }),
      new Suggest('files', 'folder', { name: 'notPorn' }),
    ]));
  }
  //      new Suggest('http://www.google.com/', 'history', 'url'),
  //      new Suggest('Praesentation.doc', 'bookmarks', 'file')

  getSuggestsSlowly(searchTerm: string): Promise<Suggest[]> {
    return new Promise<Suggest[]>(resolve =>
      setTimeout(resolve, 600)) // delay
      .then(() => this.getSuggest(searchTerm));
  }
}
