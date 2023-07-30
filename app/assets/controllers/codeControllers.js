const codeControllersIds = [];

const getCodeControllers = () => [...document.querySelectorAll('.menu .innerWindow [data-content="controllers"] .controller')];

const noController = document.querySelector('.menu .innerWindow [data-content="controllers"] .noControllers');

const codeController = (id, type = "range", options = {}) => {
    if (!id) throw "Controller needs atleast a id";

    options = Object.assign({
        min: -50,
        max: 50,
        value: 0,
        step: .1,
        interval: 250,
        automationType: "linear",
        automationCustom: null
    }, options);


    var getOutput = () => {
        var controller = document.querySelector('.menu .innerWindow [data-content="controllers"] .controller[data-id="'+id+'"]');
        var output = controller.querySelector("[data-output]").value

        if(["range", "number", "automation"].includes(controller.dataset.type)) return parseFloat(output);

        return output;
    }

    codeControllersIds.push(id);

    var find = document.querySelector('.menu .innerWindow [data-content="controllers"] .controller[data-id="'+id+'"]');
    

    if(find){
        if(find.dataset.type != type || JSON.stringify(options) != find.dataset.options || find.dataset.automationCustom != options.automationCustom+""){
            if(find.dataset.interval) clearInterval(find.dataset.interval);
            find.remove();
            find = null;

        } else {
            return getOutput();
        }        
    }


    var controllerContainer = document.querySelector('.menu .innerWindow [data-content="controllers"]');
    
    
    var br = () => document.createElement("br");
    var div = document.createElement("div");
        div.className = "controller";
        div.dataset.id = id;
        div.dataset.type = type;
        div.dataset.options = JSON.stringify(options);
        div.dataset.automationCustom = options.automationCustom + "";

        if(getCodeControllers().length) div.append(document.createElement("hr"));

        if(type == "range") {
            var span = document.createElement("span");
                span.innerHTML = id + " (deslizante)";
    
            div.append(span, br());

            var range = document.createElement("input");
                range.type = "range";

            var number = document.createElement("input");
                number.type = "number";

                number.dataset.output = "";
                
                range.min = number.min = options.min;
                range.max = number.max = options.max;
                range.value = number.value = options.value;
                range.step = number.step = options.step;

                range.addEventListener("input", () => {
                    number.value = range.value;
                    reloadPlotting();
                });
                number.addEventListener("input", () => {
                    range.value = number.value;
                    reloadPlotting();
                });

            div.append(range, br(), number);
        }

        if(type == "number") {
            var span = document.createElement("span");
                span.innerHTML = id + " (numero)";
    
            div.append(span, br());
            var number = document.createElement("input");
                number.type = "number";

                number.dataset.output = "";
                
                number.min = options.min;
                number.max = options.max;
                number.value = options.value;
                number.step = options.step;

                number.addEventListener("input", reloadPlotting);

            div.append(number);
        }

        if(type == "automation") {
            var span = document.createElement("span");
            span.innerHTML = `${id} (automação)<br>[${options.automationCustom? "customizado": options.automationType}]`;
            div.append(span, br());

            var numberOutput = document.createElement("input");
                numberOutput.type = "number";
                numberOutput.dataset.output = "";
    
            var number = document.createElement("input");
                number.type = "number";
                
                number.min = options.min;
                number.max = options.max;
                number.value = options.value;
                number.step = options.step;

                number.style.display = "none";

                div.dataset.interval = setInterval(() => {
                    var sum = parseFloat(number.value) + options.step;
                    number.value = sum > options.max? options.min: sum;
                    
                    if(typeof options.automationCustom == "function"){
                        numberOutput.value = options.automationCustom(parseFloat(number.value)) || number.value;
                        
                    } else {
                        if(options.automationType == "linear")
                        numberOutput.value = number.value;
                        
                        if(["ping pong", "sin"].includes(options.automationType))
                            numberOutput.value = sin(parseFloat(number.value));

                        if(["ping pong 2", "cos"].includes(options.automationType))
                            numberOutput.value = cos(parseFloat(number.value));

                        }
                        
                        reloadPlotting();
                    }, options.interval);
                    
            numberOutput.style.pointerEvents = 
            span.style.pointerEvents = "none";

            div.style.cursor = "not-allowed";

            div.append(numberOutput, number);
        }
    
    controllerContainer.append(div);

    return getOutput();
}

const renewCodeControllers = () => {
    getCodeControllers().forEach(e => {
        if(!codeControllersIds.includes(e.dataset.id)) e.remove();
    });
    
    noController.classList.toggle("hidden", getCodeControllers().length);
}

const controlador = (nome, tipo = "deslizante", opcoes = {}) => {

    if (!nome) throw 'Controlador precisa de pelomenos o parametro nome: controlador("nome"...';

    opcoes = Object.assign({
        minimo: -50,
        maximo: 50,
        valor: 0,
        passos: .1,
        intervalo: 250,
        tipoAutomacao: "linear",
        customAutomacao: null
    }, opcoes);

    var options = {
        min: opcoes.minimo,
        max: opcoes.maximo,
        value: opcoes.valor,
        step: opcoes.passos,
        interval: opcoes.intervalo,
        automationType: opcoes.tipoAutomacao,
        automationCustom: opcoes.customAutomacao
    }

    var types = {
        "deslizante": "range",
        "numero": "number",
        "cor": "color", /* WIP */
        "automação": "automation"
    }

    return codeController(nome, types[tipo] || "deslizante", options)
};