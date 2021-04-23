var kérdésSzám = 1;
var helyesVálasz;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(válaszfeldolgozás)
        .then(kérdésMegjelenítés);
}

function válaszfeldolgozás(válasz) {
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    let kép = document.getElementById("kép1");
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    kép.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    helyesVálasz = kérdés.correctAnswer;
}

window.onload = function () {
    kérdésBetöltés(kérdésSzám);

    document.getElementById("vissza").onclick = function () {
        if (kérdésSzám != 1) {
            kérdésSzám--;
            kérdésBetöltés(kérdésSzám);
            document.getElementById("válasz1").classList.remove('jó', 'rossz');
            document.getElementById("válasz2").classList.remove('jó', 'rossz');
            document.getElementById("válasz3").classList.remove('jó', 'rossz');
        }
    }

    document.getElementById("előre").onclick = function () {
        if (kérdésSzám != 800) {
            kérdésSzám++;
            kérdésBetöltés(kérdésSzám);
            document.getElementById("válasz1").classList.remove('jó', 'rossz');
            document.getElementById("válasz2").classList.remove('jó', 'rossz');
            document.getElementById("válasz3").classList.remove('jó', 'rossz');
        }
    }

    document.getElementById("válasz1").onclick = function () {
        if (helyesVálasz == 1) {
            document.getElementById("válasz1").classList.add('jó');
            document.getElementById("válasz2").classList.add('rossz');
            document.getElementById("válasz3").classList.add('rossz');
        }
        else {
            document.getElementById("válasz1").classList.add('rossz');
        }
    }

    document.getElementById("válasz2").onclick = function () {
        if (helyesVálasz == 2) {
            document.getElementById("válasz1").classList.add('rossz');
            document.getElementById("válasz2").classList.add('jó');
            document.getElementById("válasz3").classList.add('rossz');
        }
        else {
            document.getElementById("válasz2").classList.add('rossz');
        }
    }

    document.getElementById("válasz3").onclick = function () {
        if (helyesVálasz == 3) {
            document.getElementById("válasz1").classList.add('rossz');
            document.getElementById("válasz2").classList.add('rossz');
            document.getElementById("válasz3").classList.add('jó');
        }
        else {
            document.getElementById("válasz3").classList.add('rossz');
        }
    }
}


