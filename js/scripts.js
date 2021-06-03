var input = document.getElementById('input');
var question_list = Array();
var idx_list = Array();

const previous_btn = document.querySelector('.previous-btn');
const next_btn = document.querySelector('.next-btn');
const question = document.querySelector('.questions');
const second = document.querySelector('.second');

// when excel file is uploaded
input.addEventListener('change', function(){
    readXlsxFile(input.files[0]).then(function(data){
        data.forEach(function(elements){
            question_list.push(elements[0]);
        })
    }).then(function(){
        var i;
        for(i = 0; i < question_list.length; i++)
        {
            idx_list.push(Math.floor(Math.random() * question_list.length));
        }

        question.innerHTML = "Go!";
    });
});

// clicked functions
function left_clicked(){
    if(question_list.length != 0) {
        question.innerHTML = question_list[idx_list[idx]];

        idx = idx - 1;
        if(idx < 0) idx = question_list.length - 1;
    }

    
    clearInterval(countdown);
    currentSecond = 0;
    countdown = setInterval(countdownSecond, 1000);
}

function right_clicked(){
    if(question_list.length != 0){
        question.innerHTML = question_list[idx_list[idx]];

        idx = (idx + 1) % question_list.length;
    }

    clearInterval(countdown);
    currentSecond = 0;
    countdown = setInterval(countdownSecond, 1000);
}

// buttons clicked
var idx = 0;
previous_btn.addEventListener('click', function(){
    left_clicked();
});

next_btn.addEventListener('click', function(){
    right_clicked();
});

let countdown = setInterval(countdownSecond, 1000);

// second countdown
var currentSecond = 0;
function countdownSecond(){
    second.innerHTML = String(currentSecond) + " sec";
    currentSecond += 1;
}

// puase and stop button
const pauseButton = document.querySelector('.pause-button');
const stopButton = document.querySelector('.stop-button');
const showButton = document.querySelector('.show-button');

function pause_clicked(){
    if(pauseButton.classList.contains('play-button'))
    {
        clearInterval(countdown);
        pauseButton.classList.remove('play-button');
        pauseButton.innerHTML = '<i class="fa fas fa-pause"></i>';
        countdown = setInterval(countdownSecond, 1000);
    } else {
        clearInterval(countdown);
        pauseButton.innerHTML = '<i class="fa fas fa-play"></i>';
        pauseButton.classList.add('play-button');
    }
}

function stop_clicked(){
    clearInterval(countdown);
    pauseButton.innerHTML = '<i class="fa fas fa-play"></i>';
    currentSecond = 0;
    second.innerHTML = String(currentSecond) + " sec";
    pauseButton.classList.add('.play-button');
}

pauseButton.addEventListener('click', function(){
    pause_clicked();
});

stopButton.addEventListener('click', function(){
    stop_clicked();
});

// show button
// visibility -> visible / hidden
// display -> hidden / block
function show_clicked(){
    if(showButton.classList.contains('showing'))
    {
        console.log("showing clicked");
        showButton.classList.remove('showing');
        second.style.visibility = "hidden";
    } else {
        console.log("not showing clicked");
        showButton.classList.add('showing');
        second.style.visibility = "visible";
    }
}

showButton.addEventListener('click', function(){
    show_clicked();
});

// keyboard interrupt
window.addEventListener('keydown', function(event){
    if (event.defaultPrevented){
        return;
        // Do nothing if the event was already processed!
    }

    switch(event.key){
        case "ArrowLeft":
            left_clicked();
            break;
        case "ArrowRight":
            right_clicked();
            break;
        case " ":
            pause_clicked();
            break;
        case "t":
            show_clicked();
            break;
        default:
            return;
    }
})