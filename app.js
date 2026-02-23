//declare variables 
let userSeq = [];
let gameSeq = [];
let highScore = 0;
let started = false;

let level = 0;

let btns = ["yellow","red","purple","green"];
//access here using DOM

let h2 = document.querySelector('h2');
let allBtns = document.querySelectorAll(".btn");
let startBtn = document.querySelector("#startBtn");

//game start karne ke liye simple logic

startBtn.addEventListener("click", function(){
    if(!started){
        started = true;
        levelUp();
        startBtn.innerText = "Game Running...";
        startBtn.disabled = true;
    }
});

//button ko flash karane ke liye function

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },300)
}

//jab user kisi button pe click karega tab flash hoga button ye uska logic ------->

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash");
    },300)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4); // ye 0 se 3 ke bich ek number dega 
    let randColor = btns[randIdx]; //ye class name de dega mujhe KYUKI array me maine class name rakha hua hai ...
    let randBtn = document.querySelector(`.${randColor}`); //ye maine uss button ko select kar liya jo flash hoga
    gameSeq.push(randColor);
    gameFlash(randBtn);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    // console.log(gameSeq);
}

// ab ye main logic hai jisme sequence match karna hai !!!

function checkAns(idx) {
    // console.log("curr level :", level);
    if(userSeq[idx] === gameSeq[idx]){
       
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
        // console.log("same value");
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b>`;
        if(level == 0){
          document.querySelector("h3").innerText = `High Score : ${level}`;  
        }
        else if(level>= highScore ){
            document.querySelector("h3").innerText = `High Score : ${level-1}`;
            highScore = level;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
          document.querySelector("body").style.backgroundColor = "white";
        },500)
        reset();
    }
}



function btnPress(){
        // console.log("btn was pressed")
        // console.log(this);
        let btn = this;
        userFlash(btn);
        let userColor = btn.getAttribute("id");
        // console.log(userColor);
        userSeq.push(userColor);

        checkAns(userSeq.length-1);
    }

for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.disabled = false;
    startBtn.innerText = "Reset Game";
}