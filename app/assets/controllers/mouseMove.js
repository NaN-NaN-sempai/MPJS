addEventListener("mousemove", (e) => {
    
    var xCord = e.clientX;
    var yCord = e.clientY;

    var xPercent = (xCord/window.innerWidth) * 100;
    var yPercent = (yCord/window.innerHeight) * 100;
    
    document.querySelector(".mouseGridFollower .xbar").style.left = xPercent + "vw";
    document.querySelector(".mouseGridFollower .ybar").style.top = yPercent + "vh";

    document.querySelector(".mouseGridFollower .value").style.left = xPercent + "vw";
    document.querySelector(".mouseGridFollower .value").style.top = yPercent + "vh";

    
    var xZoom = parseFloat(document.getElementById("xZoom").value);
    var yZoom = parseFloat(document.getElementById("yZoom").value);

    
    xPercent = xPercent - 50;
    yPercent = yPercent - 50;

    xPercent = (xPercent / xZoom);
    yPercent = (yPercent / yZoom);

    xPercent = xPercent.toFixed(parseFloat(document.getElementById("deicmais").value));
    yPercent = -yPercent.toFixed(parseFloat(document.getElementById("deicmais").value));

    document.querySelector(".mouseGridFollower .value").innerHTML = "x: "+xPercent+"<br>y: "+yPercent;
});