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

    color.str = "rgb" + (noAlpha? "": "a") + `(${color.r}, ${color.g}, ${color.b + (noAlpha? "": ", " + color.a)})`;

    return color;
}

const workHex = (hex, noAlpha = false, noHashtag = false) => {
    var color = hexToRgb(hex, false, noAlpha);

    return (noHashtag? "": "#") + fixHexColorValue(color.r) + fixHexColorValue(color.g) + fixHexColorValue(color.b) + fixHexColorValue(color.a*255);
}
const invertHex = (hex, noAlpha = false, noHashtag = false) => {
    var color = hexToRgb(hex, false, noAlpha);

    color.r = 255 - color.r;
    color.g = 255 - color.g;
    color.b = 255 - color.b;
    color.a = noAlpha? color.a: 1 - color.a;

    return (noHashtag? "": "#") + fixHexColorValue(color.r) + fixHexColorValue(color.g) + fixHexColorValue(color.b) + fixHexColorValue(color.a*255);
}

const getContrastHex = (hex, noAlpha = false, noHashtag = false) => {
    var color = hexToRgb(hex, true, noAlpha);

    const brightness = Math.round(((parseInt(color.r) * 299) +(parseInt(color.g) * 587) + (parseInt(color.b) * 114)) / 1000);

    return (noHashtag? "": "#") + (brightness > 125? '000000' : 'FFFFFF') + fixHexColorValue(color.a*255);
}