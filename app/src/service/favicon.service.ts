import { Injectable } from '@angular/core';

@Injectable()
export class FaviconService {


    getFaviconURL(url: string): Promise<string> {
        return Promise.resolve('http://angular-craft.com/wordpress/wp-content/themes/angular-craft/img/fav-icon.png');
    }

    getFaviconURLSlowly(url: string): Promise<string> {
        return new Promise<string>(resolve =>
            setTimeout(resolve, 1200)) // delay
            .then(() => this.getFaviconURL(url));
    }
}
