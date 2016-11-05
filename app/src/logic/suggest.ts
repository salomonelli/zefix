
enum Source {
  'history',
  'bookmarks',
  'provider',
  'files'
}

enum Type {
  'url',
  'file',
  'folder',
  'searchTerm'
}

export class Suggest {

  public source: string;
  public type: string;
  public title: string;
  public index: number;
  public value;

  constructor(
    source: string,
    type: string,
    value
  ) {
    this.source = source;
    this.type = type;
    this.value = value;
  }

  /**
   * get the string which should be displayed
   * @return {string} with the 'title'
   */
  display(): string {
    switch (this.type) {
      case 'url':
        return this.value.url;
      case 'file':
        return this.value.name;
      case 'folder':
        return '/' + this.value.name;
      case 'searchTerm':
        return this.value.searchTerm;
    }
  }

  /**
   * get the css-class to display the right logo for the source
   * @link https://design.google.com/icons/
   * @return {string}
   */
  sourceLogo(): string {
    switch (this.source) {
      case 'history':
        return 'history';
      case 'bookmarks':
        return 'bookmark';
      case 'provider':
        return 'download';
      case 'files':
        return 'folder';
    }
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
      case 'file':
        return 'file-o';
      case 'folder':
        return 'folder-o';
      case 'searchTerm':
        return 'search';
    }
  }


}
