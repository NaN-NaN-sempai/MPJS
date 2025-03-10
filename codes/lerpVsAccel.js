/* WORKS AFTER THE LOOPS AND INTERACTIONS UPDATE */


var vel = { x: 0, y: 0 };
var acPos = { x: 0, y: 0 };

var lerpPos = { x: 0, y: 0 };

const lerp = (a, b, t) => a + (b - a) * t;
const lerpCoord = (from, to, t) => ({
  x: lerp(from.x, to.x, t),
  y: lerp(from.y, to.y, t)
});



var bounciness = controlador("bounce", "deslizante", {
    minimo: 0,
    maximo: 1,
    passos: .001,
    valor: .93
})

loop("round", () => {
    t = Object.assign({}, interactionPos);
    t.x -= 10;

    lerpPos = lerpCoord(lerpPos, t, .05)

    lerpP = P(lerpPos, {cor: "#FF0000"});

    L(lerpCoord(interactionPos, lerpP, .2),lerpP, {cor: "#FF0000"})

    function movAccel(de, para, velocidade, aceleracao = 0.01, atrito = bounciness) {
    let dx = para.x - de.x;
    let dy = para.y - de.y;

    velocidade.x += dx * aceleracao;
    velocidade.y += dy * aceleracao;

    velocidade.x *= atrito;
    velocidade.y *= atrito;

    return {
        valor: {
            x: de.x + velocidade.x,
            y: de.y + velocidade.y
        },
        velocidade
    };
}


    b = Object.assign({}, interactionPos);
    b.x += 10;

    let res = movAccel(acPos, b, vel, .01);
    acPos = res.valor;
    vel = res.velocidade;

    accel = P(acPos, {cor: "#00FFFF"});

    L(lerpCoord(interactionPos, accel, .2), accel, {cor: "#00FFFF"})
}, 1);
