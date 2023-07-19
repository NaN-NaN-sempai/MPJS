var monacoContainer = document.getElementById("monacoContainer");
var resizeThumb = document.querySelector (".resizeThumb");
var isDown = false;
var previousTouch;

const functionMouseDown = () => isDown = true;
resizeThumb.addEventListener('mousedown', functionMouseDown);
resizeThumb.addEventListener("touchstart", functionMouseDown);

const functionMouseUp = () => {
    isDown = false;
    previousTouch = null;
};
addEventListener('mouseup', functionMouseUp);
addEventListener("touchend", functionMouseUp);

const functionMove = (movement) => {
    if (isDown) {
        if(innerWidth > 600) {
            monacoContainer.style.width = !monacoContainer.style.width? monacoContainer.getBoundingClientRect().width+"px": monacoContainer.style.width;

            var endPoint = parseFloat(monacoContainer.style.width) + movement;

            if(endPoint > innerWidth - 60) endPoint = innerWidth - 60;

            monacoContainer.style.width = endPoint + 'px';
        } else {
            monacoContainer.style.height = !monacoContainer.style.height? monacoContainer.getBoundingClientRect().height+"px": monacoContainer.style.height;

            var endPoint = parseFloat(monacoContainer.style.height) + movement;

            if(endPoint > innerHeight - 60) endPoint = innerHeight - 60;

            monacoContainer.style.height = endPoint + 'px';
        }
    }
}
addEventListener('mousemove', (event) => {
    event.preventDefault();
    
    if(innerWidth > 600) {
        functionMove(event.movementX);
    } else {
        functionMove(event.movementY);
    }
});
addEventListener("touchmove", (event) => {
    var touch = event.touches[0];

    if (previousTouch) {
        var movement;
        if(innerWidth > 600) {
            movement = touch.pageX - previousTouch.pageX;
        } else {
            movement = touch.pageY - previousTouch.pageY;
        }
        functionMove(movement);
    }

    previousTouch = touch;
});

addEventListener("resize", ()=>{
    if(innerWidth > 600) {
        monacoContainer.style.height = "100%";
        monacoContainer.style.width = "200px";
    } else {
        monacoContainer.style.height =  "200px";
        monacoContainer.style.width =  "100%";
    }
})