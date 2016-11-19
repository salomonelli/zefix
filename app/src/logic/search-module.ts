import { Util } from '../util';
export class SearchModule {

    public title: string;
    public provider: string;
    public iconURL: string;
    public color: string;
    public index: number;
    public content = null;
    public secret: string;
    public height: number = 100;
    public smallDisplayOnly: boolean = false;
    public useNgContent: boolean;

    constructor(
        title: string,
        provider: string,
        iconURL: string,
        color: string,
        useNgContent: boolean = false
    ) {
        this.title = title;
        this.provider = provider;
        this.iconURL = iconURL;
        this.color = color;
        this.useNgContent = useNgContent
    }



    getDemoContent(): Promise<string> {
        return Promise.resolve(`
              <h1>Hello World from ${this.title}</h1>
              <button onClick="window.scrollTop()">scrollTop</button>
          `);
    }

    getContent(): Promise<string> {
        return new Promise<string>(resolve =>
            setTimeout(resolve, 100)) // delay
            // TODO replace getDemoContent
            .then(() => this.getDemoContent());
    }

    id(): string {
        let use = this.title + '_' + this.provider;
        return 'searchmodule_' + Util.hash(use);
    }
}
