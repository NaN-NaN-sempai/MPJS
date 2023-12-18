let red = "#FF0000";
let blue = "#0000FF";
let green = "#00FF00";

if(window.doOnce == undefined){
    window.doOnce = true;
}
if(doOnce) {
    doOnce = false;
    window.pArr = [];

    const r = (min, max) => floor(random() * (max - min + 1) + min);

    const createParticles = (color, amount) => {
        for(let i in [...Array(amount).keys()]) {
            let rx = r(-50, 50);
            let ry = r(-50, 50);
                    
            window.pArr.push({
                pos: {
                    x: rx,
                    y: ry
                },
                vel: {
                    x: 0,
                    y: 0
                },
                config: {
                    cor: color
                }
            })
        }
    }

    createParticles(red, 20);
    createParticles(blue, 20);
    createParticles(green, 20);
}

const rule = (colorA, colorB, g) => {
    let particlesA = pArr.filter(p => p.config.cor == colorA);
    let particlesB = pArr.filter(p => p.config.cor == colorB);

    for(let a of particlesA){
        let fy = 0;
        let fx = 0;
        
        for(let b of particlesB){
            let dx = a.pos.x - b.pos.x;
            let dy = a.pos.y - b.pos.y;
            
            let d = sqrt(dx*dx + dy*dy);

            if(d > 0 && d < 100) {
                let f = g * 1/d;
                fx += (f * dx);
                fy += (f * dy);
            }
                             
            a.vel.x = (a.vel.x + fx) * .1;
            a.vel.y = (a.vel.y + fy) * .1;

            a.pos.x += a.vel.x;
            a.pos.y += a.vel.y;

            if(a.pos.x <= -99 || a.pos.x >= 99){ a.vel.x *= -1 }
            if(a.pos.y <= -50 || a.pos.y >= 50){ a.vel.y *= -1 }
        }
    }     

}

rule(red, blue, -1);
rule(blue, green, -.5);
rule(green, red, -.25);

rule(red, blue, 1);
rule(blue, green, .5);
rule(green, red, .25);


pArr.forEach(p => {
    P(p.pos, p.config)
});

//doOnce = true

if(window.timeoutDoOnce == undefined){
    window.timeoutDoOnce = true;

    setTimeout(() => {
    window.timeoutDoOnce = undefined;
        reloadPlotting();
    }, 100)
}
