var kérdések;
kérdésSzám = 0;
var helyesVálasz;

function letöltés() {
    fetch("questions.json")
        .then(response => response.json())
        .then(data => letöltésbefejeződött(data));

}


function letöltésbefejeződött(k) {
    console.log("sikeres letöltés")
    console.log(k)
    kérdések = k;
    kérdésmegjelenítés(0);

}
function kérdésmegjelenítés(kérdés) {

    let kép = document.getElementById("kép1");

    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
    helyesVálasz = kérdések[kérdés].correctAnswer;

}

window.onload = () => {
    letöltés();
    document.getElementById("vissza").onclick = function () {
        kérdésSzám--;
        if (kérdésSzám == 0) {
            kérdésSzám = kérdések.length - 1;
        }
        kérdésmegjelenítés(kérdésSzám);
        document.getElementById("válasz1").classList.remove("jó", "rossz");
        document.getElementById("válasz2").classList.remove("jó", "rossz");
        document.getElementById("válasz3").classList.remove("jó", "rossz");
    }
    document.getElementById("előre").onclick = function () {
        kérdésSzám++;
        if (kérdésSzám == kérdések.length) {
            kérdésSzám = 0;
        }

        kérdésmegjelenítés(kérdésSzám);
        document.getElementById("válasz1").classList.remove("jó", "rossz");
        document.getElementById("válasz2").classList.remove("jó", "rossz");
        document.getElementById("válasz3").classList.remove("jó", "rossz");
    }



    document.getElementById("válasz1").onclick = function () {
        if (helyesVálasz == 1) {
            document.getElementById("válasz1").classList.add('jó');
        }
        else {
            document.getElementById("válasz1").classList.add('rossz');
        }
    }

    document.getElementById("válasz2").onclick = function () {
        if (helyesVálasz == 2) {
            document.getElementById("válasz2").classList.add('jó');
        }
        else {
            document.getElementById("válasz2").classList.add('rossz');
        }
    }

    document.getElementById("válasz3").onclick = function () {
        if (helyesVálasz == 3) {
            document.getElementById("válasz3").classList.add('jó');
        }
        else {
            document.getElementById("válasz3").classList.add('rossz');
        }
    }
}
