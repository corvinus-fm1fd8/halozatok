var hotlist = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestion;
var nextQuestion = 1;
var timerHandler;

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotlist[i] =
        {
            question: {},
            goodAnswers: 0
        }

    }

    //kérdések száma
    fetch(`questions/{sorszám}`)
        .then(result => result.text())
        .then(n => { numberOfQuestion = parseint(n) })


    document.getElementById("előre").addEventListener("click", előre)
    document.getElementById("vissza").addEventListener("click", vissza)

}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {

                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotlist[destination].question = q;
            hotlist[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotlist${destination}. helyére. `)

        })
}

function kérdésMegjelenítés() {
    let kérdés = hotlist[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz3").innerText = kérdés["answer3"];

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";

    }
    for (var i = 0; i < 3; i++) {
        document.getElementById("válasz" + i).classList.remove("jó", "rossz")

    }
    document.getElementById("válaszok").style.pointerEvents = "auto";



}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) {
        displayedQuestion = 0;

    }
    kérdésMegjelenítés();
}
function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) {
        displayedQuestion = questionsInHotList - 1;

    }
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotlist[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotlist[displayedQuestion].goodAnswers++;
        if (hotlist[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;

        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
        hotlist[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);
    if (localStorage.getItem("hotlist")) {
        hotlist = JSON.parse(localStorage.getItem("hotlist"))
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }

    if (hotlist.length > 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;

        }

    }
    else {
        kérdésMegjelenítés();
    }
}

window.onload = init;
