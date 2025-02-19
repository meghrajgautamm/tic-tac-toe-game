let hide=document.querySelector(".hideGame");
let startGame=document.querySelector(".startGame");
const openGame=()=>{
    startGame.style.display="none";
    hide.classList.remove("hide");
    resetGame();
}

let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGame=document.querySelector("#newGame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let assist=document.querySelector(".howToPlay");
let home=document.querySelector("#goHome");
let music= new Audio("music.mp3");
let audioTurn= new Audio("ting.mp3");
let turnAudio= new Audio("ting.mp3");

let turn0 = true;
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turn0){
            box.innerText="O";
            box.style.color="Green";
            turn0=false;
            audioTurn.play();
        }else{
            box.innerText="X";
            box.style.color="Red";
            turn0=true; 
            turnAudio.play();    
        }
        box.disabled = true;
        count++;
    
        let isWinner = checkWinner();
    
        if (count === 9 && !isWinner) {
          gameDraw();
        }
    });
});
let movetoResult=document.querySelector(".movetoResult");
const gameDraw=()=>{
    msg.innerText = `Game was a Draw.`;
   msgContainer.classList.remove("remove");
    disableBoxes();
    img.style.width="0px"; 
    newGame.style.marginTop="0";  
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner)=>{
     msg.innerText=`Congratulation, The winner is ${winner} !`;
    msgContainer.classList.remove("remove");
   // hide.classList.add("hide"); I think it is good to keep because sometime the player wanted to know their moves.
    img.style.width="200px";
    music.play();
    music.currentTime=0;
}
const checkWinner=()=>{
    for( let pattern of winPatterns){
     let pos1Val=boxes[pattern[0]].innerText;
     let pos2Val=boxes[pattern[1]].innerText;
     let pos3Val=boxes[pattern[2]].innerText;

     if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val ===  pos3Val){
            showWinner(pos1Val);
            disableBoxes();
           return true;
           
        }
      }
    }
};
const resetGame=()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("remove");
    hide.classList.remove("hide");
    music.pause();
    count=0;
}
const goHome=()=>{
    msgContainer.classList.add("remove");
    hide.classList.add("hide");
    startGame.style.display="block";
    instruction.style.display="none";
    music.pause();
}
newGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
home.addEventListener("click",goHome)

const showDiv=()=>{
    assist.classList.remove("cords");
}

const clearDiv=()=>{
    assist.classList.add("cords");
}

let instruction=document.querySelector(".instructions");
const instructions=()=>{
   if (instruction.style.display==="none"){
    instruction.style.display="block";
   }else{
    instruction.style.display="none";
   }
}
instruction.addEventListener('click',instructions());

let img=document.querySelector(".img");
