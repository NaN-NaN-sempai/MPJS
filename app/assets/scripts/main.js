const plane = document.querySelector(".planeContainer"),
      graphObjectHover = document.querySelector(".graphObjectHover"),
      decimalAmount = {value: 3};

const cordDefault = {x: 0, y:0};
const sizeDefault = 10;
const generateInterval = (from = -50, to = 50, steps = 1) => {
    var arr = [];
    for(i = from; (from>to? i >= to: i <= to); i = (from>to? i - steps: i + steps)){
        arr.push(i);
    }
    return arr;
};
const defaultInterval = generateInterval(-50, 50);

const toFixedFormated = n => n % 1 !== 0 ? n.toFixed(decimalAmount.value) : n;

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
        size: sizeDefault,
        color: palette.mainColor,
        outline: palette.mainColorContrast
    }, options);

    var displayX = toFixedFormated(cord.x),
        displayY = toFixedFormated(cord.y),
        el = document.createElement("div");

        el.style.setProperty("--color", options.color);
        el.style.setProperty("--outline", options.outline);
        el.style.setProperty("--size", options.size + "px");

        el.className = "dot graphObject";
        el.style.left = (cord.x + 50) + "%";
        el.style.bottom = (cord.y + 50) + "%";

        if(options.setupHover) {
            setupGraphObjectHover(el, {
                text: "Ponto => x: " + toFixedFormated(displayX) + ", y: " + toFixedFormated(displayY),
                color: options.color,
                outline: options.outline,
                textColor: getContrastHex(options.color, true)
            });
        }
        

    plane.append(el);

    if(options.returnEl) return el;
}


const plotLine = (from = cordDefault, to = cordDefault, options = {})  => {
    options = Object.assign({
        returnEl: false,
        setupHover: true,
        size: sizeDefault,
        color: palette.mainColorContrast
    }, options);

    var direction = {
        x: to.x - from.x,
        y: to.y - from.y
    }
    var distance = Math.sqrt( ((to.x - from.x) ** 2) + ((to.y - from.y) ** 2) );

    var angle = Math.atan2((from.x - to.x), (from.y - to.y)) * (180 / Math.PI) + 90;

    var el = document.createElement("hr");
        el.className = "line graphObject"; 
        el.style.left = (from.x + (direction.x / 2) + 50) + "%";
        el.style.bottom = (from.y + (direction.y / 2) + 50) + "%";
        el.style.width = distance+"%";
        el.style.height = (options.size * 1.5)/2 + "px";
        el.style.setProperty("--size", options.size + "px");
        el.style.transform = `translate(-50%, 50%) rotate(${angle}deg)`;

        el.style.setProperty("--color", options.color);

        if(options.setupHover){
            setupGraphObjectHover(el, {
                text: "Linha => De x: " + toFixedFormated(from.x) + ", y: " + toFixedFormated(from.y) + " para x: " + toFixedFormated(to.x) + ", y: " +toFixedFormated(to.y),
                color: options.color
            });
        }

    plane.append(el);

    if(options.returnEl) return el;
}


const plotVector = (to = cordDefault, options = {})  => {
    options = Object.assign({
        returnEl: false,
        setupHover: true,
        size: sizeDefault,
        color: palette.mainColorContrast,
        position: cordDefault
    }, options);

    
    var towards = {  x: options.position.x + to.x,   y: options.position.y + to.y  };

    var notPointing = options.position.x == towards.x && options.position.y == towards.y;

    var text = `Vetor => ${options.position != cordDefault? `Em x: ${toFixedFormated(options.position.x)}, y: ${toFixedFormated(options.position.y)}`: ""}${!notPointing? ` Apontando para x: ${toFixedFormated(towards.x)}, y: ${toFixedFormated(towards.y)}`: ""}${notPointing && options.position == cordDefault? "Na Origem": ""}`;
    var setupHover = {
        text,
        color: options.color
    };

    /* line */
    var line = plotLine(options.position, towards, {returnEl: true});
        line.classList.add("vectorLine");
        line.style.height = (options.size * 1.5)/2 + "px";

        line.style.setProperty("--color", options.color);

        line.style.display = (notPointing? "none": "inline");




    /* head */
    var head = plotDot(towards, {returnEl: true});
        head.classList.add("vectorHead", (notPointing? "vectorHeadNotPointing": "vectorHeadPointing"));
        head.style.setProperty("--size", options.size * 3 + "px");

        head.style.setProperty("--color", options.color);
        head.style.setProperty("--outline", "transparent");
        
        var angle = Math.atan2((options.position.x - towards.x), (options.position.y - towards.y)) * (180 / Math.PI) + 180;
        head.style.transform = `translate(-50%, 50%) rotate(${angle}deg)`;




    /* base */
    var base = plotDot(options.position, {returnEl: true});
        base.classList.add("vectorBase");
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
        size: sizeDefault,
        color: palette.mainColor,
        outline: palette.mainColorContrast,
        interval: defaultInterval
    }, options);

    var textColor = getContrastHex(options.color, true);

    var els = [];

    options.interval.forEach((n, i, arr) => {
        var pos = func(n);
        var setupHover = {
            text: "Função => x: " + toFixedFormated(pos.x) + ", y: " + toFixedFormated(pos.y) + " em ("+ toFixedFormated(n) +") de "+ toFixedFormated(arr[0]) +" a "+ toFixedFormated(arr.at(-1)),
            color: options.color,
            outline: options.outline,
            textColor
        };
        var dot = plotDot(pos, {returnEl: true, setupHover: false, size: options.size, color: options.color, outline: options.outline});
        
        setupGraphObjectHover(dot, setupHover); 

        if(i == arr.length-1) return;

        var nextValue = arr[i+1];
        var pos2 = func(nextValue);
        setupHover.text =  "Função => x: " + toFixedFormated(pos2.x) + ", y: " + toFixedFormated(pos2.y) + " em ("+ toFixedFormated(arr[i+1]) +") de "+ toFixedFormated(arr[0]) +" a "+ toFixedFormated(arr.at(-1))

        var line = plotLine(pos, pos2, {returnEl: true, setupHover: false, size: options.size, color: options.color});
        
        setupGraphObjectHover(line, setupHover);
        els.push(dot, line);
    });

    if(options.returnEl) return els;
}











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
window.addEventListener("resize", reiniciar);

/* executar_funcao(funcao_padrao); */