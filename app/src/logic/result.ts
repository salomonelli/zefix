

enum Type {
    'url',
    'image',
    'video'
}

export class Result {

    public type: string;
    public title: string;
    public description: string;
    public url: string;
    public urlIcon: string;
    public urlIconLoaded: boolean = false;
    public index: number;

    constructor(
        type: string,
        title: string,
        description: string,
        url: string
    ) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.url = url;
    }


    /**
     * get the css-class to display the right logo for the type
     * @link https://design.google.com/icons/
     * @return {string}
     */
    typeLogo(): string {
        switch (this.type) {
            case 'url':
                return 'link';
            case 'image':
                return 'insert_drive_file';
            case 'video':
                return 'folder_open';
        }
    }


}
