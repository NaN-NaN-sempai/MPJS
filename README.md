```javascript
* -----> ao decorrer do projeto, pode acabar sendo descartado
Ideia -> caso não tenha nada para mecher no projeto, posso considerar implementar




[PRIORIDADE - ALTA]:

concertar loops que ficam sendo criados enquanto escreve o codigo mudando o nome e erro ao mudar o timing do loop

* mover e zoom no grafico

* transformar barras dos eixos x e y do plano cartesianos em objetos moviveis

* consertar indicador de posição do mouse, e possivelmente implementar touchmove para mobile





[PRIORIDADE - MEDIA]:

* remover variaveis criadas durante a execução do codigo.
checa Object.names(window) antes e depois de executar o codigo,
os valores novos serão apagados.

criar colorInput customizado
input color personalizado

(para monaco editor)
fazer auto completions para todos os valores importantes do MPJS:
cordenada --------------------- feito
ponto ------------------------- feito
exemplo_ponto ----------------- feito
linha ------------------------- feito
exemplo_linha ----------------- NÃO
funcao ------------------------ NÃO
exemplo_funcao ---------------- NÃO
funcao_simples ---------------- NÃO
exemplo_funcao_simples -------- NÃO
funcao_complexa --------------- AINDA NÃO IMPLEMENTADO
exemplo_funcao_complexa ------- AINDA NÃO IMPLEMENTADO
loop -------------------------- NÃO
exemplo_loop ------------------ NÃO
interacao --------------------- NÃO - AINDA EM INGLÊS
exemplo_interacao ------------- NÃO
controlador ------------------- feito
exemplo_controlador ----------- feito
exemplo_controlador_automação - feito
glifos ------------------------ feito
cores (en e br) --------------- feito
Objeto Math ------------------- feito





[PRIORIDADE - BAIXA]:

compartilhar codigo

* modo de compartilhamento ->
padrão - compartilha codigo inteiro sem modificações
slim --- diminui o codigo ao maximo e compartilha

* mudar editor para mobile

* EDITAR resizeCode.js => mousemove prevent default apenas para mobile

LOGO MPJS - alguma coisa com matematica e logo quadrada do javascript
nas cores js yellow #e8d44d e vscode dark #1e1e1e

CRIAR FUNNÇÃO COMPLEXA:
PASSA POR CADA CORDENADA - PIXEL DA TELA,
TRADUZ A CORDENADA PARA 0, 0 SER TAMANHO DA TELA / 2
(FUTURAMENTE USAR OFFSET NA TRADUÇÃO PARA PODER MOVER O GRAFICO)
CHECA SE CORDENADA SATISFAZ O FILTRO
SE SATISFAZER
PLOTAR PONTO

controlador de cor funcionando

controlador de cor com input de cor personalizado

documentação PMJS





[PRIORIDADE - OPCIONAL]:

Ideia - teclado matematico

Ideia - refazer ou criar nova versão em canvas





###########################################################################################################
###########################################################################################################
###########################################################################################################

[FEITO]: 

(main.js)
novo plotador baseado em js dinamico 


(monacoEditorBuilder.js)
Snipets para todos os valores de Math 

interação de cores e eventos do codigo para editar o valor da cor


(menuOptions.js)
aba de configuraçãos 


(codeControllers.js)
na aba de configuraçãos adicionar inputs que podem ser acessados no codigo 
ao inserir um valor nessese inputs, altomaticamente o plotador reiniciar
os inputs podem ser de tipo slider, number, color, text e etc
depende do decorrer do projeto (in progress)
```
