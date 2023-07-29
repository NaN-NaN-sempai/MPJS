/* html changes */
/* 
const observer = new MutationObserver((e) => {
    var event = new CustomEvent("htmlupdate", {detail: e});
    
    dispatchEvent(event);
})  
observer.observe(document, {subtree: true, childList: true, attributes: true, attributeOldValue: true}); */




/* colors */
const hexFix = (hex, noHashtag = false) => {
    if (hex.indexOf('#') == 0) hex = hex.slice(1);

    if (hex.length == 1) hex = hex[0] + hex[0] + "0000";

    if (hex.length == 2) hex = hex[0] + hex[0] + hex[1] + hex[1] + "00";

    if (hex.length == 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

    if (hex.length == 4) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];

    if (hex.length == 5) hex = hex[0] + hex[1] + hex[2] + hex[3] + hex[4] + hex[4];

    if (hex.length == 7) hex = hex[0] + hex[1] + hex[2] + hex[3] + hex[4] + hex[5] + hex[6] + hex[6];

    return (noHashtag? "": "#") + hex;
}

const padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

const intToHex = (int, maxSize = Infinity, minSize = -Infinity) => {
    int = parseInt(int || 0);
    int = int > maxSize? maxSize: int < minSize? minSize: int;
    return int.toString(16);
}

const fixHexColorValue = (int) => padZero(parseInt(int).toString(16));

const setStrOnHexToRgb = (rgbObj, doOnOriginal = false, noAlpha = false) => {
    var copy = Object.assign({}, rgbObj);
    var affect = doOnOriginal? rgbObj: copy;
    affect.str = "rgb" + (noAlpha? "": "a") + `(${affect.r}, ${affect.g}, ${affect.b + (noAlpha? "": ", " + affect.a)})`;
    return copy;
};
const hexToRgb = (hex, retString = false, noAlpha = false) => {
    hex = hexFix(hex, true);

    const strOrInt = (str, isAlpha = false) => {;
        var ret = parseInt(str, 16);

        if(isNaN(ret)) ret = 255;        

        if(isAlpha) ret = Math.round((ret/255) * 1000) / 1000;

        return retString? ret.toString(): ret;
    };

    var color = {
        r: strOrInt(hex.slice(0, 2)),
        g: strOrInt(hex.slice(2, 4)),
        b: strOrInt(hex.slice(4, 6)),
        a: strOrInt(noAlpha? "FF": hex.slice(6, 8), true)
    }

    setStrOnHexToRgb(color, true, noAlpha);

    return color;
}

const workHex = (hex, operations = {}, noAlpha = false, noHashtag = false) => {
    var color = hexToRgb(hex, false, noAlpha);

    if(typeof operations == "boolean") {
        noHashtag = noAlpha;
        noAlpha = operations;

    } else if(typeof operations == "object") {
        Object.entries(operations).forEach(o => {
            var selector  = o[0],
                operation = o[1];

            if(color[selector] == undefined || typeof operation != "function") return;

            color[selector] = operation(color[selector]);
        });

        setStrOnHexToRgb(color, true, noAlpha)
    }

    return ((noHashtag? "": "#") + fixHexColorValue(color.r) + fixHexColorValue(color.g) + fixHexColorValue(color.b) + (noAlpha? "FF": fixHexColorValue(color.a*255))).toUpperCase();
}
const invertHex = (hex, noAlpha = false, noHashtag = false) => workHex(hex, {
    r: (n) => 255 - n,
    g: (n) => 255 - n,
    b: (n) => 255 - n,
    a: (n) => noAlpha? n: 1 - n,
}, noAlpha, noHashtag);

const getContrastHex = (hex, noAlpha = false, noHashtag = false) => {
    var color = hexToRgb(hex, true, noAlpha);

    const brightness = Math.round(((parseInt(color.r) * 299) +(parseInt(color.g) * 587) + (parseInt(color.b) * 114)) / 1000);

    return (noHashtag? "": "#") + (brightness > 125? '000000' : 'FFFFFF') + fixHexColorValue(color.a*255);
}


/* random */
const randomNumber = (upto = 100) => Math.floor(Math.random() * upto);


/* scoped eval */
const scopedEval = (script, options = {}, scope = {}) => {
    var functionSelector = options.async? AsyncFunction: Function;
    var useStrict = options.useStrict?'"use strict";':"";
    
    return functionSelector(`${useStrict}${script}`).bind(scope)();
}
/* evaluate js (only suports module.exports) */
const evalJsModule = (script) => scopedEval(`var module = {exports: undefined};\n${script}\nreturn module.exports`);

/* scss variables */
const getScssVariables = (script) => {
    var keysReg = /(?<=\$)(\w|_)+(?=(\s+)?:)/gm,
        valsReg = /(?<=:\s+).+(?=;)/mg,
        keysInsideVals = /\$(\w|_)+/mg,

        keys = script.match(keysReg),
        vals = script.match(valsReg),
        
        obj = {};

    keys.forEach((key, i) => {
        obj[key.replaceAll(" ", "")] = vals[i].trimStart();
    });

    Object.entries(obj).forEach(e => {
        var [key, val] = e;
        var keyInVal = val.match(keysInsideVals);

        if(!keyInVal) return;

        keyInVal.forEach(k => {
            var sKey = k.substring(1);

            var reg = new RegExp("\\"+k+"\\b", "g");

            obj[key] = obj[key].replace(reg, obj[sKey]);
        });
    });

    return obj;
}

/* require */
const customRequire = (options = {url: "", method: "GET", async: false}, callback = ()=>{}) => {
    if(typeof options == "string") options = {url: options};
    options = Object.assign({url: "", method: "GET", async: false}, options);
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function(...event) {
        if (this.status == 404) {
            console.error("Requisition not found: "+options.url+"\n\noptions: "+JSON.stringify(options, null, 4) + "\n\ncallback: " + callback);
            this.errorOccurred = true;
        };

        this.usedOptions = options; 

        var contentType = this.getResponseHeader('content-type').split('/')[1];
        this.text = () => this.responseText;
        this.json = () => contentType.includes("json")? JSON.parse(this.response): ["Request is not JSON."];
        this. js  = () => contentType.includes("javascript")? evalJsModule(this.response): "Request is not Javascript.";
        this.scss = () => options.url.toLowerCase().endsWith(".scss")? getScssVariables(this.response): "Request is not SCSS or an error occurred during match proccess.";

        callback(this, event);
    }

    xhttp.open(options.method, options.url, options.async);
    xhttp.send();
}



/* compare objects */
const compareObjs = (obj, obj2) => JSON.stringify(obj) === JSON.stringify(obj2);

