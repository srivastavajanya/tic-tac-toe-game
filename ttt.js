let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msgcontainer");
let count = 0;//tack draw
let turn0 = true;//player X or player O

const winpatterns = [//check the possible win patterns
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetgame = () =>{
    turn0 = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
       if(turn0){
        //player O
        box.innerText ="O";
        turn0 = false;
       }
       else{
        //player X
        box.innerText ="X";
        turn0 = true;
       }
       box.disabled = true;
       count++;
      let isWinner = checkWinner();

      if(count === 9 && !isWinner){
        gameDraw();
      }
    });
});

const gameDraw =() =>{
    msg.innerText = `It's a Draw`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const disableboxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableboxes =() =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner =(winner) =>{
        msg.innerText = `Congratulations, winner is ${winner}`;
        msgcontainer.classList.remove("hide");
        disableboxes();
};

const checkWinner = () =>{
    for( let pattern of winpatterns){
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if(pos1value != "" && pos2value != "" && pos3value != ""){
            if(pos1value === pos2value && pos2value === pos3value){
                showWinner(pos1value);
                return true;
            }
        }
    }
};
newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);