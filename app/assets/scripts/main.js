const plane = document.querySelector(".planeContainer"),
      graphObjectHover = document.querySelector(".graphObjectHover"),
      decimalAmount = () => document.getElementById("decimalPlaces").value;

const cordDefault = {x: 0, y:0};
const sizeDefault = () => parseInt(document.getElementById("sizeDefault").value);
const generateInterval = (from = -50, to = 50, steps = 1) => {
    var arr = [];
    var wich = from>to;
    for(var i = from; (wich? i >= to: i <= to); i = (wich? i - steps: i + steps)){
        arr.push(i);
    }
    if(wich? arr.at(-1) > to: (from<to? arr.at(-1) < to: false)) arr.push(to);
    return arr;
};
const defaultInterval = generateInterval(-50, 50);

const formatFix = n => n % 1 !== 0 ? n.toFixed(decimalAmount()) : n;

const setupGraphObjectHover = (el, options = {}) => {
    options = Object.assign({
        text: "Texto...",
        color: palette.mainColor,
        outline: palette.mainColorContrast,
        textColor: getContrastHex(palette.mainColorContrast, true)
    }, options);

    el.addEventListener("mousemove", (evt) => {
        graphObjectHover.style.display ="inline";

        graphObjectHover.style.setProperty("--color", options.color);
        graphObjectHover.style.setProperty("--outline", options.outline);
        graphObjectHover.style.setProperty("--textColor", options.textColor);

        graphObjectHover.innerHTML = options.text;

        var mouseOffset = 10;

        graphObjectHover.style.top = evt.clientY - graphObjectHover.getBoundingClientRect().height - mouseOffset > 0?
            evt.clientY - graphObjectHover.getBoundingClientRect().height - mouseOffset + "px":
            evt.clientY + mouseOffset + "px";

            
        graphObjectHover.style.left = evt.clientX - graphObjectHover.getBoundingClientRect().width - mouseOffset > 0?
            evt.clientX - graphObjectHover.getBoundingClientRect().width - mouseOffset + "px":
            evt.clientX + mouseOffset + "px";

    });
    el.addEventListener("mouseout", () => {
        graphObjectHover.style.display ="none";
        
    });
}




const plotDot = (cord = cordDefault, options = {}) => {
    options = Object.assign({
        returnEl: false,
        setupHover: true,
        name: null,
        size: sizeDefault(),
        color: palette.mainColor,
        outline: palette.mainColorContrast
    }, options);

    var dot = document.createElement("div");

        dot.style.setProperty("--color", options.color);
        dot.style.setProperty("--outline", options.outline);
        dot.style.setProperty("--size", options.size + "px");

        dot.className = "plotedObject dot";
        dot.style.left = (cord.x + 50) + "%";
        dot.style.bottom = (cord.y + 50) + "%";

        if(options.setupHover) {
            setupGraphObjectHover(dot, {
                text: `Ponto ${options.name? `(<b>${options.name}</b>) `: ""}=> ${compareObjs(cord, cordDefault)? "Na Origem": `𝒙: ${formatFix(cord.x)}, 𝓎: ${formatFix(cord.y)}`}`,
                color: options.color,
                outline: options.outline,
                textColor: getContrastHex(options.color, true)
            });
        }
        

    plane.append(dot);

    if(options.returnEl) return dot;
}


const plotLine = (from = cordDefault, to = cordDefault, options = {})  => {
    options = Object.assign({
        returnEl: false,
        setupHover: true,
        name: null,
        size: sizeDefault(),
        color: palette.mainColorContrast
    }, options);

    var direction = {
        x: to.x - from.x,
        y: to.y - from.y
    }
    var distance = Math.sqrt( ((to.x - from.x) ** 2) + ((to.y - from.y) ** 2) );

    var angle = Math.atan2((from.x - to.x), (from.y - to.y)) * (180 / Math.PI) + 90;

    var line = document.createElement("hr");
        line.className = "plotedObject line"; 
        line.style.left = (from.x + (direction.x / 2) + 50) + "%";
        line.style.bottom = (from.y + (direction.y / 2) + 50) + "%";
        line.style.width = distance+"%";
        line.style.height = (options.size * 1.5)/2 + "px";
        line.style.setProperty("--size", options.size + "px");
        line.style.setProperty("--angle", angle+"deg");

        line.style.setProperty("--color", options.color);

        if(options.setupHover){
            setupGraphObjectHover(line, {
                text: `Linha ${options.name? `(<b>${options.name}</b>) `: ""}=> ${(compareObjs(from, cordDefault)? "Da Origem": `De 𝒙: ${formatFix(from.x)}, 𝓎: ${formatFix(from.y)}`)}<br>Para ${(compareObjs(to, cordDefault)? "a Origem": `𝒙: ${formatFix(to.x)}, 𝓎: ${formatFix(to.y)}`)}<br>Distancia: ${formatFix(distance)}`,
                color: options.color
            });
        }

    plane.append(line);

    if(options.returnEl) return line;
}


const plotVector = (to = cordDefault, options = {})  => {
    options = Object.assign({
        returnEl: false,
        setupHover: true,
        name: null,
        size: sizeDefault(),
        color: palette.mainColorContrast,
        position: cordDefault
    }, options);

    
    var towards = {  x: options.position.x + to.x,   y: options.position.y + to.y  };

    var notPointing = compareObjs(options.position, towards);

    var text = `Vetor ${options.name? `(<b>${options.name}</b>) `: ""}=> Direção 𝒙: ${to.x}, 𝓎: ${to.y}<br>${!compareObjs(options.position, cordDefault)? `Em 𝒙: ${formatFix(options.position.x)}, 𝓎: ${formatFix(options.position.y)}`: ""}${!notPointing? `<br>Apontando para 𝒙: ${formatFix(towards.x)}, 𝓎: ${formatFix(towards.y)}`: ""}${notPointing && compareObjs(options.position, cordDefault)? "Na Origem": ""}`;
    var setupHover = {
        text,
        color: options.color
    };

    /* line */
    var line = plotLine(options.position, towards, {returnEl: true});
        line.classList.add("vector");
        line.style.height = (options.size * 1.5)/2 + "px";

        line.style.setProperty("--color", options.color);

        line.style.display = (notPointing? "none": "inline");




    /* head */
    var head = plotDot(towards, {returnEl: true});
        head.classList.add("vector", "head", (notPointing? "notPointing": "pointing"));
        head.style.setProperty("--size", options.size * 3 + "px");

        head.style.setProperty("--color", options.color);
        head.style.setProperty("--outline", "transparent");
        
        var angle = Math.atan2((options.position.x - towards.x), (options.position.y - towards.y)) * (180 / Math.PI) + 180;
        head.style.setProperty("--angle", angle+"deg");




    /* base */
    var base = plotDot(options.position, {returnEl: true});
        base.classList.add("vector", "base");
        base.style.setProperty("--size", options.size * 1.5 + "px");

        base.style.setProperty("--color", options.color);
        base.style.setProperty("--outline", "transparent");

        base.style.display = (notPointing? "none": "inline");

        
    if(options.setupHover) {
        setupGraphObjectHover(line, setupHover);
        setupGraphObjectHover(head, setupHover);
        setupGraphObjectHover(base, setupHover);
    }

    plane.append(line, head, base);

    if(options.returnEl) return {line, head, base};
}


const plotFunction = (func = () => cordDefault, options = {}) => {
    options = Object.assign({
        returnEl: false,
        setupHover: true,
        name: null,
        size: sizeDefault(),
        color: palette.mainColor,
        outline: palette.mainColorContrast,
        interval: defaultInterval
    }, options);

    var textColor = getContrastHex(options.color, true);

    var els = [];

    options.interval.forEach((n, i, arr) => {
        var pos = func(n);

        var setupHover = {
            text: `Função ${options.name? `(<b>${options.name}</b>) `: ""}=> ${compareObjs(pos, cordDefault)? "Na Origem": `𝒙: ${formatFix(pos.x)}, 𝓎: ${formatFix(pos.y)}`}<br>Em (${formatFix(n)}) de [${formatFix(arr[0])} a ${formatFix(arr.at(-1))}]`,
            color: options.color,
            outline: options.outline,
            textColor
        };
        var dot = plotDot(pos, {returnEl: true, setupHover: false, size: options.size, color: options.color, outline: options.outline});
        
        dot.classList.add("functionDot");
        if(options.setupHover) setupGraphObjectHover(dot, setupHover); 
        els.push(dot);


        if(i == arr.length-1) return;

        var nextValue = arr[i+1];
        var nextPos = func(nextValue);
        var line = plotLine(pos, nextPos, {returnEl: true, setupHover: false, size: options.size, color: options.color});
        
        
        setupHover.text = `Função ${options.name? `(<b>${options.name}</b>) `: ""}=> ${(compareObjs(pos, cordDefault)? "Da Origem": `De 𝒙: ${formatFix(pos.x)}, 𝓎: ${formatFix(pos.y)}`)}<br>Para ${(compareObjs(nextPos, cordDefault)? "a Origem": `𝒙: ${formatFix(nextPos.x)}, 𝓎: ${formatFix(nextPos.y)}`)}<br>Em (${formatFix(n)}) de [${formatFix(arr[0])} a ${formatFix(arr.at(-1))}]`;

        line.classList.add("functionLine");
        if(options.setupHover) setupGraphObjectHover(line, setupHover);
        els.push(line);
    });

    if(options.returnEl) return els;
}


const plotConnection = (...params) => {
    if(params.length == 0) return;

    var defaultOption = {
        returnEl: false,
        setupHover: true,
        name: null,
        size: sizeDefault(),
        color: palette.mainColor,
        outline: palette.mainColorContrast,
    };
    var cords;
    var options = params.at(-1) || {};

    var isOption = Object.entries(options).find(e => defaultOption[e[0]] != undefined);

    if(isOption) {
        options = Object.assign(defaultOption, options);
        cords = params.slice(0, -1);

    } else {
        options = defaultOption;
        cords = params;
    }

    
    var textColor = getContrastHex(options.color, true);
    
    var els = [];

    cords.forEach((pos, i, arr) => {
        var setupHover = {
            text: `Conexão ${options.name? `(<b>${options.name}</b>) `: ""}=> ${compareObjs(pos, cordDefault)? "Na Origem": `𝒙: ${formatFix(pos.x)}, 𝓎: ${formatFix(pos.y)}`}`,
            color: options.color,
            outline: options.outline,
            textColor
        };

        var dot = plotDot(pos, {returnEl: true, setupHover: false, size: options.size, color: options.color, outline: options.outline});

        dot.classList.add("connectionDot");
        if(options.setupHover) setupGraphObjectHover(dot, setupHover); 
        els.push(dot);


        if(i == arr.length-1) return;

        var nextPos = arr[i+1];
        var line = plotLine(pos, nextPos, {returnEl: true, setupHover: false, size: options.size, color: options.color});
        
        setupHover.text = `Conexão ${options.name? `(<b>${options.name}</b>) `: ""}=> ${(compareObjs(pos, cordDefault)? "Da Origem": `De 𝒙: ${formatFix(pos.x)}, 𝓎: ${formatFix(pos.y)}`)}<br>Para ${(compareObjs(nextPos, cordDefault)? "a Origem": `𝒙: ${formatFix(nextPos.x)}, 𝓎: ${formatFix(nextPos.y)}`)}`;

        line.classList.add("connectionLine");
        if(options.setupHover) setupGraphObjectHover(line, setupHover);
        els.push(line);
    });

    if(options.returnEl) return els;
}


const eraseGraph = () => [...document.querySelectorAll(".plotedObject")].forEach(e => e.remove());





const objectsToPlot = [];

const ponto = function(posicao = {}, opcoes = {}) {
    if (!(this instanceof ponto)) return new ponto(posicao, opcoes);

    this.type = "dot";

    posicao = Object.assign({
        x: cordDefault.x,
        y: cordDefault.y
    }, posicao);

    opcoes = Object.assign({
        tamanho: sizeDefault(),
        cor: palette.mainColor,
        borda: palette.mainColorContrast,
        nome: null,
        plotar: true
    }, opcoes);

    var dot = Object.assign(posicao, opcoes);

    Object.entries(dot).forEach(e => {
        this[e[0]] = e[1];
    });

    /* works only for variables */
    this.instanceName = function() {
        var find = Object.entries(window).find(e => e[1] == this);
        return this.nome || (find? find[0]: null);
    };

    objectsToPlot.push(this);
}
const P = ponto;


const linha = function(de = {}, para = {}, opcoes = {}) {
    if (!(this instanceof linha)) return new linha(de, para, opcoes);

    this.type = "line";

    de = Object.assign({
        x: cordDefault.x,
        y: cordDefault.y
    }, de);

    para = Object.assign({
        x: cordDefault.x,
        y: cordDefault.y
    }, para);

    opcoes = Object.assign({
        tamanho: sizeDefault(),
        cor: palette.mainColorContrast,
        plotar: true
    }, opcoes);

    var line = Object.assign({de, para}, opcoes);

    Object.entries(line).forEach(e => {
        this[e[0]] = e[1];
    });

    /* works only for variables */
    this.instanceName = function() {
        var find = Object.entries(window).find(e => e[1] == this);
        return find? find[0]: null;
    };

    objectsToPlot.push(this);
}
const L = linha;


const plotObjects = () => {
    eraseGraph();

    objectsToPlot.forEach(obj => {
        if(!obj.plotar) return;

        if(obj.type == "dot") {
            plotDot(obj, {
                name: obj.instanceName(),
                size: obj.tamanho,
                color: obj.cor,
                outline: obj.borda
            });

        } else if(obj.type == "line") {
            plotLine(obj.de, obj.para, {
                name: obj.instanceName(),
                size: obj.tamanho,
                color: obj.cor
            });
        }
    });
}




const windowScopeEval = (...params) => eval(...params);




/* setup math */
Object.getOwnPropertyNames(Math).forEach(e => {
    Object.defineProperty(window,
        e,
        {
            value: Math[e],
            enumerable: true,
            configurable: true,
            writable: false
        });
});



var lastWorkingCode = "";
const onCodeInputFunction = (evalString) => {
    objectsToPlot.length = 0;
    codeControllersIds.length = 0;
    
    var worked;
    try {
        windowScopeEval(evalString);
        worked = true;

    } catch (error) {
        windowScopeEval(lastWorkingCode);
        //console.log(error);
        worked = false;
    }

    if(!worked) return; /* add error handler */

    lastWorkingCode = evalString;

    plotObjects();
    renewCodeControllers();
}

const reloadPlotting = () => {
    onCodeInputFunction(lastWorkingCode);
}






/*
CRIAR FUNNÇÃO COMPLEXA:
PASSA POR CADA CORDENADA - PIXEL DA TELA,
TRADUZ A CORDENADA PARA 0, 0 SER TAMANHO DA TELA / 2
(FUTURAMENTE USAR OFFSET NA TRADUÇÃO PARA PODER MOVER O GRAFICO)
CHECA SE CORDENADA SATISFAZ O FILTRO
SE SATISFAZER
PLOTAR PONTO
*/
/* 

var i3 = generateInterval(0, innerWidth);
var i2 = generateInterval(0, innerHeight);

arr = [];

i3.forEach(n => {
    i2.forEach(m => {
        arr.push({x: n, y: m})
    })
})

var s = 10

arr;

var b = arr.filter(e => (e.x ** 2) + (e.y ** 2) == 1);

//plotConnection(...arr)

b;

*/

























/* old */

var criar_ponto = (x, y, valorX, valorY, tamanho) => {
    var container = document.querySelector(".container");

    if(isNaN(x) || isNaN(y)) {
        return;
    }
    var ponto = document.createElement("div");
        ponto.className = "ponto apagar"; 
        ponto.style.left = (x + 50) + "%";
        ponto.style.bottom = (y + 50) + "%";

        valorX = valorX.toFixed(parseFloat(document.getElementById("deicmais").value));
        valorY = valorY.toFixed(parseFloat(document.getElementById("deicmais").value));

        ponto.dataset.pos = "x: " + valorX + ", y: " + valorY;
        ponto.style.width = ponto.style.height = (tamanho || 5) + "px";

    container.append(ponto);
}
var criar_barra = (x1, y1, x2, y2, tamanho)  => {
    var container = document.querySelector(".container");

    if(isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        return;
    }

    var direcao = {
        x: x2 - x1,
        y: y2 - y1
    }
    var distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    var angulo = Math.atan2((x1 - x2), (y1 - y2)) * (180 / Math.PI) + 90;

    
    var barra = document.createElement("hr");
        barra.className = "barra apagar"; 
        barra.style.left = (x1 + (direcao.x / 2) + 50) + "%";
        barra.style.bottom = (y1 + (direcao.y / 2) + 50) + "%";
        barra.style.width = distancia+"%";
        barra.style.height = ((tamanho || 5) * 1.5)/2 + "px";
        barra.style.transform = "translate(-50%, 50%) rotate("+angulo+"deg)";

    container.append(barra);
}

var executar_funcao = (funcao) => { 
    ultima_funcao = funcao; 
    var tamanho = parseFloat(document.getElementById("tamanho").value);
    var resolucao = parseFloat(document.getElementById("resolucao").value);
    var xZoom = parseFloat(document.getElementById("xZoom").value);
    var yZoom = parseFloat(document.getElementById("yZoom").value);

    var passo = 1/resolucao;

    var intervalS = parseInt(document.getElementById("intervaloI").value);
    var intervalE = parseInt(document.getElementById("intervaloF").value);


    for(i = intervalS; i < intervalE; i += passo){ 
        criar_ponto(i * xZoom, funcao(i) * yZoom, i, funcao(i), tamanho);

        var iAux = i + passo;

        if(i == intervalE-1) break;

        criar_barra(i * xZoom, funcao(i) * yZoom,
                    iAux * xZoom, funcao(iAux) * yZoom, tamanho);
    }
}

var apagar_tudo = () => {
    Array.from(document.querySelectorAll(".apagar")).forEach(e => e.remove());
}

var reiniciar = () => {
    apagar_tudo();
    executar_funcao(ultima_funcao)
}

var funcao_padrao = x => Math.pow(x, 3);

document.getElementById('monacoContainer').addEventListener("monacoEditorInput", function(event) {
    return;
    var {monacoEditor} = event.detail;
    
    var equacao = monacoEditor.getValue();
    var span = document.getElementById("equacaoSpan");

    location.hash = encodeURI(equacao);

    if(equacao.length < 5) monacoEditor.setValue("x => ");

    try {
        apagar_tudo();
        executar_funcao(eval("with(Math){"+equacao+"}"));
        //equacao.classList.remove("erro");
        span.classList.remove("erro");
        document.querySelector(".erroDisplay").classList.remove("erro");
        document.querySelector(".erroDisplay").innerHTML = "";
        document.querySelector(".erroDisplay").style.display = "none";

    } catch (erro) {
        apagar_tudo();
        executar_funcao(funcao_padrao);
        //equacao.classList.add("erro");
        span.classList.add("erro");
        document.querySelector(".erroDisplay").classList.add("erro");
        document.querySelector(".erroDisplay").innerHTML = erro;
        document.querySelector(".erroDisplay").style.display = "block";
    }
});

document.getElementById("tamanho").addEventListener("input", reiniciar);
document.getElementById("resolucao").addEventListener("input", reiniciar);
document.getElementById("zoom").addEventListener("input", () => {
    document.getElementById("yZoom").value = document.getElementById("zoom").value;
    document.getElementById("xZoom").value = document.getElementById("zoom").value;
    reiniciar();
});
document.getElementById("yZoom").addEventListener("input", reiniciar);
document.getElementById("xZoom").addEventListener("input", reiniciar);
document.getElementById("intervaloI").addEventListener("input", reiniciar);
document.getElementById("intervaloF").addEventListener("input", reiniciar);
document.getElementById("deicmais").addEventListener("input", reiniciar);
// window.addEventListener("resize", reiniciar);

/* executar_funcao(funcao_padrao); */