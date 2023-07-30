const codeControllersIds = [];

const getCodeControllers = () => [...document.querySelectorAll('.menu .innerWindow [data-content="controllers"] .controller')];

const noController = document.querySelector('.menu .innerWindow [data-content="controllers"] .noControllers');

const codeController = (id, type = "range", options = {}) => {
    if (!id) throw "Controller needs atleast a id";

    options = Object.assign({
        min: -50,
        max: 50,
        value: 0,
        steps: .1
    }, options);


    var getOutput = () => {
        var controller = document.querySelector('.menu .innerWindow [data-content="controllers"] .controller[data-id="'+id+'"]');
        var output = controller.querySelector("[data-output]").value

        if(["range", "number"].includes(controller.dataset.type)) return parseFloat(output);

        return output;
    }

    codeControllersIds.push(id);

    var find = document.querySelector('.menu .innerWindow [data-content="controllers"] .controller[data-id="'+id+'"]');
    

    if(find){
        if(find.dataset.type != type || JSON.stringify(options) != find.dataset.options){
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
                range.step = number.step = options.steps;

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
                number.step = options.steps;

                number.addEventListener("input", reloadPlotting);

            div.append(number);
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
        passos: .1
    }, opcoes);

    var options = {
        min: opcoes.minimo,
        max: opcoes.maximo,
        value: opcoes.valor,
        steps: opcoes.passos
    }

    var types = {
        "deslizante": "range",
        "numero": "number",
        "cor": "color"
    }

    return codeController(nome, types[tipo] || "deslizante", options)
};