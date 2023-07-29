var button = document.querySelector(".shareButton");
button.addEventListener("click", ()=>{
    var defaultButtonText = "Compartilhar Função";
    var copiedInterval;
    
    if(navigator.share) {
        navigator.share({
            title: "Minhas Função: " + decodeURI(location.hash).slice(1) + " | Plotador de Funções (PdeF)",
            text: "Plotador de Funções (PdeF)\n\nMinhas Função:\n\n" + decodeURI(location.hash).slice(1) + "\n\n",
            url: location.href,
        })
        .then(() => {
            button.innerHTML = `Compartilhado`;

            clearInterval(copiedInterval);
            copiedInterval = setTimeout(() => {
                button.innerHTML = defaultButtonText; 
            }, 1500);
        })
        .catch((error) => console.log('Erro ao compartilhar:\n' + error));

    } else {
        alert("Seu navegador não suporta compartiplhamento :(");
    }
});

addEventListener("load", ()=>{
    if(location.hash){
        monacoEditor.setValue(decodeURI(location.hash).slice(1));
    }
});