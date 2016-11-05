let MobileDetect = require('mobile-detect');
let keccak_256 = require('js-sha3').keccak_256;
let randomstring = require("randomstring-ng");
export class Util {



    /**
     * numberate the given array and give each object an index
     * @param  {{}[]}   inputArr
     * @return {{index: number}[]}
     */
    static numberate(inputArr): Object[] {
        let ret = [];
        let i = 0;
        inputArr.forEach((result) => {
            result.index = i;
            i++;
            ret.push(result);
        });
        return ret;
    }

    /**
     * add a secret-attribute with random string to each object
     */
    static addSecrets(inputArr) {
        let ret = [];
        inputArr.forEach((result) => {
            result.secret = Util.randomString(32);
            ret.push(result);
        });
        return ret;
    }


    static isMobileCache: boolean = null;
    static isMobile(): boolean {
        if (Util.isMobileCache == null) {
            let md = new MobileDetect(window.navigator.userAgent);
            Util.isMobileCache = false;
            if (md.mobile() || md.phone() || md.tablet()) {
                Util.isMobileCache = true;
            }
        }
        return Util.isMobileCache;
    }


    /**
    * this trick open the url in new tab
    * @link http://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window-using-javascript
    */
    static openInNewTab(url: string) {
        let win = window.open(url, '_blank');
        win.focus();
    }



    static hash(input: string): string {
        return keccak_256(input);
    }

    static randomString(length: number): string {
        return randomstring.generate(length);
    }


    /**
     * simulate a keydown-event
     * @link http://stackoverflow.com/a/10520017
     * @param  {*} target element to fire the event at (window, document..)
     */
    static simulateKeydown(keyCode: string, key: string, ctrlKey: boolean, target) {
        let oEvent = document.createEvent('KeyboardEvent');

        // Chromium Hack
        Object.defineProperty(oEvent, 'keyCode', {
            get: function() {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'code', {
            get: function() {
                return this.keyCodeVal;
            }
        });
        Object.defineProperty(oEvent, 'which', {
            get: function() {
                return this.keyCodeVal;
            }
        });

        Object.defineProperty(oEvent, 'key', {
            get: function() {
                return key;
            }
        });
        Object.defineProperty(oEvent, 'ctrlKey', {
            get: function() {
                return ctrlKey;
            }
        });
        let initMethod = typeof oEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
        oEvent[initMethod](
            "keydown", // event type : keydown, keyup, keypress
            true, // bubbles
            true, // cancelable
            document.defaultView, // viewArg: should be window
            false, // ctrlKeyArg
            false, // altKeyArg
            false, // shiftKeyArg
            false, // metaKeyArg
            keyCode, // keyCodeArg : unsigned long the virtual key code, else 0
            keyCode // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
        );
        oEvent['keyCodeVal'] = keyCode;
        target.dispatchEvent(oEvent); // fire!
    }


    /**
     * scroll to top of page
     * TODO animate this so it doesnt 'jump'
     */
    static scrollToTop() {
        window.scrollTo(0, 0);
    }

}
