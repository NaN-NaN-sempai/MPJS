const intervalResolutionFunc = function() {
    var iptRange = document.getElementById("intervalResolutionRange");
    var iptNumber = document.getElementById("intervalResolution");

    if(this == iptRange) iptNumber.value = iptRange.value;
    if(this == iptNumber) iptRange.value = iptNumber.value;

    var steps = parseFloat(iptNumber.value);
    var beg = parseInt(document.getElementById("defaultIntervalBegin").value);
    var end = parseInt(document.getElementById("defaultIntervalEnd").value);

    var generatedInterval = generateInterval(beg, end, 1/steps);

    defaultInterval.length = 0;
    generatedInterval.forEach(e => defaultInterval.push(e));

}


document.getElementById("decimalPlaces").addEventListener("input", reloadPlotting);

/* inteval */
document.getElementById("defaultIntervalBegin").addEventListener("input", intervalResolutionFunc);
document.getElementById("defaultIntervalEnd").addEventListener("input", intervalResolutionFunc);




/* interval resolution */
document.getElementById("intervalResolutionRange").addEventListener("input", intervalResolutionFunc);
document.getElementById("intervalResolution").addEventListener("input", intervalResolutionFunc);




/* size default */
document.getElementById("sizeDefaultRange").addEventListener("input", function() {
    document.getElementById("sizeDefault").value = this.value;

    reloadPlotting();
});
document.getElementById("sizeDefault").addEventListener("input", function() {
    document.getElementById("sizeDefaultRange").value = this.value;

    reloadPlotting();
});
