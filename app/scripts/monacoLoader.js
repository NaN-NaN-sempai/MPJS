require.config({ paths: { 'vs': './scripts/monaco_editor/min/vs' }});

var monacoElement = document.getElementById('monacoContainer');

require(["vs/editor/editor.main"], () => {
    monaco.editor.defineTheme('my-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            "editorLineNumber.foreground": "#6e7681",
            "editorLineNumber.activeForeground": "#cccccc" 
        }
    });

    var monacoEditor = window.monacoEditor = monaco.editor.create(monacoElement, {
        value: "x => pow(x, 3)",
        language: 'javascript',
        theme: 'my-dark',
        lineNumbersMinChars: 2,
        minimap: {
            enabled: false
        }
    });

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

        run: function (ed) { },
    });

    new ResizeObserver(() => monacoEditor.layout()).observe(monacoElement);

    window.monacoEditor.getModel().onDidChangeContent((evt) => {
        var event = new CustomEvent("monacoEditorInput", {detail: { monacoEditor }});
        monacoElement.dispatchEvent(event);
    });
});