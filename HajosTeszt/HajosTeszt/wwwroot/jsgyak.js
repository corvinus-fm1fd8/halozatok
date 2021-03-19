
var faktorialis = function(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result = result * i;
    }
    return result;
}

function pascal(n, k)
{
    return faktorialis(n) / (faktorialis(k) * faktorialis(n-k));
}



window.onload = () =>
{
    for (var s = 0; s < 10; s++) {
        var sor = document.createElement("div");
        sor.className = "sor";
        document.getElementById("pascal").appendChild(sor);

        for (var o = 0; o < s; o++) {
            var oszlop = document.createElement("div");
            sor.appendChild(oszlop);
            oszlop.className = "elem";
            oszlop.innerHTML = `${pascal(s, o)}`;
            oszlop.style.backgroundColor = `rgb(${227 - pascal(s, o)},
${228 - pascal(s, o)},${255 - pascal(s, o)})`;
        }

    }
}
