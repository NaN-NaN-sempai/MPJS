/* WORKS AFTER THE LOOPS AND INTERACTIONS UPDATE */

const lerp = (a, b, t) => a + (b - a) * t;

const lerpCoord = (from, to, t) => ({
  x: lerp(from.x, to.x, t),
  y: lerp(from.y, to.y, t)
});

var snakes = [];
var ogPos = Object.assign({}, cordDefault);

var makeSnake = (name, c = 0, diff= 1, size = 5) => {  
    var snake = snakes.find(e => e.name == name);  
    var p = snake.pos;
 
    [...Array(size).keys()].forEach((i, _, arr) => {
        var selC = [
            `rgb(${(((size-i/3) / size) * 255)}, 0, 0)`, // Vermelho
            `rgb(0, ${(((size-i/3) / size) * 255)}, 0)`, // Verde
            `rgb(0, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)})`, // Azul/Verde
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, 0)`, // Amarelo
            `rgb(${(((size-i/3) / size) * 255)}, 0, ${(((size-i/3) / size) * 255)})`, // Roxo
            `rgb(0, 0, ${(((size-i/3) / size) * 255)})`, // Azul escuro
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 128)}, ${(((size-i/3) / size) * 64)})`, // Laranja
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 128)})`, // Amarelo claro
            `rgb(${(((size-i/3) / size) * 128)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 128)})`, // Verde claro
            `rgb(${(((size-i/3) / size) * 64)}, ${(((size-i/3) / size) * 128)}, ${(((size-i/3) / size) * 255)})`, // Azul claro
            `rgb(${(((size-i/3) / size) * 128)}, ${(((size-i/3) / size) * 0)}, ${(((size-i/3) / size) * 255)})`, // Azul escuro 2 
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)})`, // Branco
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 0)}, ${(((size-i/3) / size) * 255)})`, // Magenta
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 192)})`, // Creme
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 127)}, ${(((size-i/3) / size) * 0)})`, // Amarelo dourado
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 0)}, ${(((size-i/3) / size) * 128)})`, // Vermelho escuro
            `rgb(${(((size-i/3) / size) * 0)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)})`, // Azul claro 2
            `rgb(${(((size-i/3) / size) * 192)}, ${(((size-i/3) / size) * 192)}, ${(((size-i/3) / size) * 255)})`, // Azul suave
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 128)}, ${(((size-i/3) / size) * 255)})`, // Rosa claro
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 64)}, ${(((size-i/3) / size) * 0)})`, // Laranja queimado
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 0)})`, // Amarelo brilhante
            `rgb(${(((size-i/3) / size) * 192)}, ${(((size-i/3) / size) * 64)}, ${(((size-i/3) / size) * 255)})`, // Roxo suave
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 64)})`, // Amarelo limão
            `rgb(${(((size-i/3) / size) * 64)}, ${(((size-i/3) / size) * 128)}, ${(((size-i/3) / size) * 255)})`, // Azul água
            `rgb(${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 255)}, ${(((size-i/3) / size) * 128)})`  // Amarelo pastel
        ];


        p[i] = p[i] != null? p[i]: Object.assign({}, cordDefault);

        var lastPos = p[i-1]; 

        var endPos = Object.assign({}, interactionPos);

        if(!lastPos) lastPos = endPos;

        var befSnake = snakes[snake.id-1];

        if(befSnake) {
            if(i == arr.length-1) {
                snake.pos[0] = befSnake.pos[befSnake.pos.length-1]
            } 
        }


        p[i] = lerpCoord(p[i], lastPos, .1); 

        var nowp = P(p[i], {cor: selC[c%selC.length], nome: "Cobra "+ name })

        if(i) L(nowp, lastPos)

        ogPos = lerpCoord(ogPos, interactionPos, .0001);
        L(ogPos, nowp, { cor: selC[c%selC.length]})
    })
}

var runningSnakes = [];
loop("executeSnakes", ()=>{ 
    snakes.forEach((snake, i) => {
        makeSnake(snake.name, snake.c)
    })
}, 1)
var addSnake = () => snakes.push( {
    id: snakes.length,
    name: "s_"+snakes.length,
    c: snakes.length,
    pos: []
});

loop("addSnake", ()=>{ 
    addSnake()    
}, 6000) 
  
addSnake()