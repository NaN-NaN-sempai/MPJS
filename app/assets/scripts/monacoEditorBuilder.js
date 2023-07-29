var monacoEditorScript = document.querySelector('script[data-script-mode]'),
    monacoEditorScriptMode = monacoEditorScript.dataset.scriptMode,
    monacoEditorSrc = monacoEditorScript.src.slice(0, monacoEditorScript.src.indexOf("monacoEditorBuilder"));

require.config({ paths: { 'vs': monacoEditorSrc+`/monacoEditor/${monacoEditorScriptMode}/vs` }});

var monacoElement = document.getElementById('monacoContainer');

require(["vs/editor/editor.main"], async () => {
    
    var regexHexColor = /#(?:[0-9a-fA-F]){3,8}/g;//,
        //regexRgbColor = /rgba?\(((\s+)?[0-9]{1,3}(,| )){2}(\s+)?[0-9]{1,3}((,| )?(\s+)?[0-1]?(\.)?[0-9]{1,3}?)?(\s+)?\)/g,
        //regexCssColorNames = new RegExp(cssColorNameList.map(e=>e.name).join("|"), "g");
        /* 
            editar rgb para tipo: rgb(0 0 0 / 100%)
            hsl
            hwb
            lch
            oklch
            lab
            oklab
        */

    monaco.editor.defineTheme('my-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: "comment", foreground: "#808080" },
            { token: "identifier", foreground: "#9cdcfe" },
        ],
        colors: {
            "editorLineNumber.foreground": "#6e7681",
            "editorLineNumber.activeForeground": "#d3ddd2" 
        }
    });
    
    function createDependencyProposals(range) {
        var retArr = [];

        const addCompletions = (labels, comp) => {
            labels.forEach(l => {
                var insert = Object.assign({}, comp);
                insert.label = l;
                retArr.push(insert);
            });
        }


        /* plot */
        addCompletions(["P", "ponto"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função plota um ponto no grafico.",
            insertText: 'P(${1:posicao}${2:, opcoes})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["exemplo_ponto"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função plota um ponto no grafico.",
            insertText: 
"${1:"+`/*
    ponto(posicao, opcoes);

    posicao - x: numero, y: numero
    opcoes -
        cor: string cor do ponto
        borda: string cor da borda do ponto,
        plotar: booleano false para não plotar o ponto, os valores do ponto ainda podem ser acessados mesmo sem plotar,
        nome: string nome que aparecerá ao inspecionar o ponto
*/`+ '\n}ponto(${2:{x: 0, y: 0}}, {\n\tcor: ${3:"#E8D44D"},\n\tborda: ${4:"#1E1E1E"},\n\tplotar: ${5:true},\n\tnome: ${6:"nomeDoPonto"}\n});',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });

        
        addCompletions(["cordenada"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Gera um exemplo de cordenada",
            insertText: '{x: ${1:0}, y: ${2:0}}',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });




        /* colors */

        cssColorNameList_pt_BR.forEach(c => {
            addCompletions(["cor: "+c.name],{
                kind: monaco.languages.CompletionItemKind.Color,
                documentation: "Insira uma cor para ser usada ao plotar alguma coisa. Para mudar a cor selecione o texto duas vezes e um seletor irá abrir na sua tela.",
                insertText: `"${c.hex}"`,
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                command: {
                    id: colorCommandId, // ID of the command of the callback function
                    title: "commandTitle",
                    arguments: ['item 1']
                }
            });
        });
        cssColorNameList.forEach(c => {
            addCompletions(["color: "+c.name],{
                kind: monaco.languages.CompletionItemKind.Color,
                documentation: "Enter a color to be used when plotting something. To change the color select the text twice and a selector will open on your screen.",
                insertText: `"${c.hex}"`,
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                command: {
                    id: colorCommandId, // ID of the command of the callback function
                    title: "commandTitle",
                    arguments: ['item 1']
                }
            });
        });


        /* glyphs */

        glyphs.forEach(g => {
            addCompletions([`Glifo: ${g.glyph} (${g.name})`],{
                kind: monaco.languages.CompletionItemKind.Variable,
                documentation: "Use esses glifos como variáveis ou como texto no seu código.",
                insertText: g.glyph,
                range: range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            });
        });


        /* from Math */

        addCompletions(["cos", "cosseno"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função cosseno retorna um número entre -1 e 1, que representa o cosseno de um ângulo.",
            insertText: 'cos(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["sin", "seno"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função seno retorna um número entre -1 e 1, que representa o seno de um ângulo.",
            insertText: 'sin(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["tan", "tangente"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função tangente retorna um valor numérico que representa a tangente do ângulo inserido.",
            insertText: 'tan(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });

        addCompletions(["cosh", "cosseno hiperbólico"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função cosseno hiperbólico retorna o cosseno hiperbólico de um número, que pode ser expressada usando constante 'E': cosh(x) = (E^x + E^-x)/2 ",
            insertText: 'cosh(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["sinh", "senh", "seno hiperbólico"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função seno hiperbólico retorna o seno hiperbólico de um número, que pode ser expressada usando constante 'E': sinh(x) = (E^x - E^-x)/2 ",
            insertText: 'sinh(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["tanh", "tangente hiperbólico"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função tangente hiperbólico retorna a tangente hiperbólico de um número, que pode ser expressada usando constante 'E': tanh(x) = sinh(x)/cosh(x) = (E^2x - 1)/(E^2x + 1) ",
            insertText: 'tanh(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });

        addCompletions(["acos", "arco cosseno", "cosseno inverso"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função arco cosseno retorna o arco cosseno ou o cosseno inverso do argumento. O arco cosseno é o ângulo cujo cosseno é o argumento. O ângulo retornado é fornecido em radianos no intervalo de 0 (zero) para π.",
            insertText: 'acos(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["atan", "arco tangente", "tangente inversa"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função arco tangente retorna o arco tangente ou a tangente inversa de seu argumento. O arco tangente é o ângulo cuja tangente é o argumento. O ângulo retornado é fornecido em radianos no intervalo de -π/2 para π/2.",
            insertText: 'atan(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["asin", "asen", "arco seno", "seno inverso"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função arco seno retorna um valor numérico entre -π/2 e π/2 radianos para todo x entre -1 e 1. Se o valor de x estiver fora deste intervalo NaN é retornado.",
            insertText: 'asin(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });

        addCompletions(["acosh", "cosseno hiperbólico inverso", "arco cosseno hiperbólico"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função cosseno hiperbólico inverso fornece um ângulo hiperbólico correspondente a um determinado valor da função hiperbólica.",
            insertText: 'acosh(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["asinh", "seno hiperbólico inverso", "arco seno hiperbólico"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função seno hiperbólico inverso retorna o seno hiperbólico inverso de um ângulo dado em radianos.",
            insertText: 'asinh(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["atanh", "tangente hiperbólico inverso", "arco tangente hiperbólico"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função tangente hiperbólico inverso retorna o arco tangente hiperbólico de um número",
            insertText: 'atanh(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });

        addCompletions(["atan2", "arco tangente 2", "tangente inversa 2"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função arco tangente 2 retorna um valor numérico entre -π e π representando o ângulo teta entre (x, y). Assim indo no sentido anti-horario ao ângulo, medido em radianos, entre o eixo X positivo, e o ponto(x, y).Nota os argumentos para essa função: primeiro o eixo Y(ordenadas) e o eixo X(absissas) como segundo parâmetro.",
            insertText: 'atan2(${1:x}, ${2:y})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        
        addCompletions(["ceil", "teto"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função teto retorna retorna o menor número inteiro maior ou igual ao valor inserido na função.",
            insertText: 'ceil(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["sqrt", "raiz quadrada"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função raiz quadrada retorna a raiz quadrada de um número.",
            insertText: 'sqrt(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["cbrt", "raiz cúbica"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função raiz cúbica retorna a raiz cúbica de um número",
            insertText: 'cbrt(${1:valor})',    
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["expm1"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função exmp1 retorna 'E' (base do sistema natural de logaritmos) elevado à potência de um número, subtraído por 1.",
            insertText: 'expm1(${1:valor})',    
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["clz32"], {
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função clz32 retorna um número de zero bits à esquerda na representação binária de 32 bits do número fornecido.",
            insertText: 'clz32(${1:valor})',    
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["mod", "modulo", "absoluto", "abs"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Modulo matemático",
            insertText: 'abs(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["exp", "exponencial"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função exponencial retorna E elevado à potência do valor inserido. 'E' é a base do sistema natural de logaritmos (aproximadamente 2,718282)",
            insertText: 'exp(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["floor"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função floor retorna o menor número inteiro dentre o número inserido.",
            insertText: 'floor(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["fround"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função fround retorna a representação flutuante (float) de precisão única de 32 bits mais próxima de um número.",
            insertText: 'fround(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["hypot"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função hypot retorna a raiz quadrada do somátorio do quadrado dos valores inseridos.",
            insertText: 'hypot(${1:valor1, valor2, ...})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["imul"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função imul retorna o resultado da multiplicação de 32 bits semelhante a linguagem C dos dois valores.",
            insertText: 'imul(${1:valor1}, ${2:valor2})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["log", "logaritmo"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função logaritmo retorna o logaritmo natural de um número",
            insertText: 'log(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["log2", "logaritmo 2"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função logaritmo 2 retorna o logaritmo de base 2 de um número.",
            insertText: 'log2(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["log10", "logaritmo 10"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função logaritmo 10 retorna o logaritmo de base 10 de um número.",
            insertText: 'log10(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["max", "maior"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função maior retorna o maior dos valores inseridos",
            insertText: 'log10(${1:valor1, valor2, ...})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["min", "menor"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função menor retorna o menor dos valores inseridos",
            insertText: 'min(${1:valor1, valor2, ...})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["pow", "elevado"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função elevado retorna a base elevada ao expoente, ou seja, base ^ exponente.",
            insertText: 'pow(${1:base}, ${2:exponente})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["random", "aleatorio"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função aleatorio retorna um número pseudo-aleatório entre 1 e 0, ou seja, de 0 (inclusivo) até, mas não incluindo, 1 (exclusivo).",
            insertText: 'random()',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["round", "arredondar"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função arredondar retorna o valor de um número arredondado para o inteiro mais proximo.",
            insertText: 'round(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["sign", "sinal"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função sinal retorna o sinal de um número, indicando se o número é positivo, negativo ou zero.",
            insertText: 'sign(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["log1p"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função logaritmo retorna o logaritmo natural de um número",
            insertText: 'log1(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["trunc", "truncamento"],{
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "A função trunc retorna a parte inteira de um número, descartando suas casas decimais.",
            insertText: 'trunc(${1:valor})',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });

        addCompletions(["E", "base dos logarítmos naturais"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A constante E representa a base dos logarítmos naturais, aproximadamente 2.718",
            insertText: 'E',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["LN2"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A constante LN2 representa o logaritmo natural de 2, aproximadamente 0.693",
            insertText: 'LN2',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["LN10"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A constante LN10 representa o logaritmo natural de 10, aproximadamente 2.302",
            insertText: 'LN10',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["LOG10E"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A conostante LOG10E representa o logaritmo com base 10 de E, aproximadamente 0.434",
            insertText: 'LOG10E',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["LOG2E"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A conostante LOG2E representa o logaritmo com base w de E, aproximadamente 1.442",
            insertText: 'LOG2E',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["SQRT1_2"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A conostante SQRT1_2 a raiz quadrada de 1/2, que é aproximadamente 0.707",
            insertText: 'SQRT1_2',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["SQRT2"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A conostante SQRT2 a raiz quadrada de 2, que é aproximadamente 1.414",
            insertText: 'SQRT2',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        addCompletions(["PI"],{
            kind: monaco.languages.CompletionItemKind.Variable,
            documentation: "A conostante PI representa a proporção entre circunferência de um círculo com o seu diâmetro, aproximadamente 3.14159",
            insertText: 'PI',
            range: range,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        });
        
        return retArr;
    }
    monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: function (model, position) {
            // find out if we are completing a property in the 'dependencies' object.
            var textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });
            var match = textUntilPosition;
            var word = model.getWordUntilPosition(position);
            var range = new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);
            return {
                suggestions: createDependencyProposals(range),
            };
        },
    });

    monaco.languages.registerHoverProvider('javascript', {
        provideHover: function(model, position) {             
            //console.log(model.getLineContent(position.lineNumber));
            /* 
                var str= "    #ffffff        "
                pos = str.search(/#(?:[0-9a-fA-F]){1,6}/gm)
                w = str.match(/#(?:[0-9a-fA-F]){1,6}/gm)
                str.slice(pos)
            */
        }
    });


    monaco.languages.typescript.javascriptDefaults.addExtraLib(``, 'filename/facts.d.ts');
    
    var monacoEditor = window.monacoEditor = monaco.editor.create(monacoElement, {
        value: `//escreva "exemplo_ponto" e selecione a sugestão para plotar um ponto`,
        language: 'javascript',
        theme: 'my-dark',
        lineNumbersMinChars: 2,
        wordWrap: "on",
        unicodeHighlight: {
            ambiguousCharacters: false,
        },
        minimap: {
            enabled: false
        }
    });
    monacoEditor.setValueText = (str) => {
        monacoEditor.setValue(str);
        colorSetup();
    }
    
    var monacoTextArea = monacoElement.querySelector("textarea");

    

    monacoEditor.addAction({
        id: "saveActionId",
        label: "Save",
        keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
            monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyS,
        ],
        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: 1.5,

        run: (ed) => { },
    });

    var oldMatches;
    var colorSetup = monacoEditor.colorSetup = () => {
        var matches = monacoEditor.getModel().findMatches(regexHexColor, true, true, false, null, true);

        if(JSON.stringify(matches) == JSON.stringify(oldMatches)) return;

        monacoEditor.removeDecorations(monacoEditor.getModel().getAllDecorations().map(e=>e.id))

        matches.forEach((match, i) => {
            monacoEditor.createDecorationsCollection([
                {
                    range: match.range,
                    options: {
                        isWholeLine: false,
                        inlineClassName: "monacoColorInputHighlight rangeOn_" + match.range.startLineNumber +"split"+ match.range.startColumn +"split"+ match.range.endLineNumber +"split"+ match.range.endColumn,
                        hoverMessage: [
                            { value: '**Selecionador de cores**'}, 
                            { value: `<span>Click duas vezes para abrir o selecionador.</span>` }
                        ]
                    }
                }
            ]);
        });

        oldMatches = matches;
    }
    colorSetup();

    monacoEditor.getModel().onDidChangeContent(colorSetup);
    monacoEditor.onDidPaste(colorSetup);
    var colorCommandId = monacoEditor.addCommand(-1, () => colorSetup(), "");

    /* color input inicialization */
    var observer = new MutationObserver(() => {
        var colorInput = monacoElement.querySelectorAll(".monacoColorInputHighlight");

        if(!colorInput.length) return;
        
        
        colorInput.forEach(el => {
            el.addEventListener("dblclick", ()=>alert(2));

            var color = hexFix(el.innerHTML);

            el.style.setProperty("--bgColor", color);
            el.style.setProperty("--bgColorNoAlpha", workHex(color, true));
            el.style.setProperty("--textColor", getContrastHex(color, true));
        });
    })  
    observer.observe(monacoElement, {childList: true, subtree: true});

    /* eventListener for color input */
    addEventListener("dblclick", evt => {
        var elementList = document.elementsFromPoint(evt.clientX, evt.clientY);

        var colorInput = elementList.find(e => e.classList.contains("monacoColorInputHighlight"));

        if(!colorInput) return;

        var range = colorInput.className.split(" ").find(e => e.includes("rangeOn")).replace("rangeOn_", "").split("split").map(e=>parseInt(e));
        range = new monaco.Range(...range);

        var fullText = monacoEditor.getValue().split("\n");

        var line = fullText[range.startLineNumber-1],
            before = line.slice(0, range.startColumn - 1),
            after  = line.slice(range.endColumn - 1, line.length);
            
        /* set color here */
        fullText[range.startLineNumber-1] = before + prompt("(WIP) Inset Color:","#ff00ff") + after;

        var newFullText = fullText.join("\n");

        monacoEditor.setValueText(newFullText)
    });
    

    new ResizeObserver(() => monacoEditor.layout()).observe(monacoElement);

    window.monacoEditor.getModel().onDidChangeContent((evt) => {
        var event = new CustomEvent("monacoEditorInput", {detail: { monacoEditor }});
        monacoElement.dispatchEvent(event);
    });


    monacoTextArea.addEventListener("focus", () => monacoElement.style.opacity = 1);
    monacoTextArea.addEventListener("blur", () => monacoElement.style.opacity = "");
    monacoTextArea.focus();

    monacoEditor.onDidChangeModelContent(() => {
        onCodeInputFunction(monacoEditor.getValue())
    });
});