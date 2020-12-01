var main_div = document.getElementById('main');
var win_sec = document.getElementById('win_sec');
var win_label = document.getElementById('win_label');
var x = document.getElementById('x');
var o = document.getElementById('o');
var player = false;
var gEnd = false;
var p1Score = 0;
var p2Score = 0;
var p1 = [];
var p2 = [];
var win_case1 = [1, 2, 3];
var win_case2 = [4, 5, 6];
var win_case3 = [7, 8, 9];
var win_case4 = [1, 4, 7];
var win_case5 = [1, 5, 9];
var win_case6 = [3, 6, 9];
var win_case7 = [2, 5, 8];
var win_case8 = [3, 5, 7];
var win_cases = [win_case1, win_case2, win_case3, win_case4,
    win_case5, win_case6, win_case7, win_case8];
var isSubset = false;
function drawBtns() {
    for (i = 1; i <= 9; i++) {
        main_div.innerHTML += '<div class="btnXO" id="' + i + '" onclick="playXO(' + i + ')">';
    }

}

function playXO(num) {
    if (gEnd == true) {
        clr_game();
        gEnd = false;
    } else {
        if (player == false && document.getElementById(num).innerHTML == "") {
            document.getElementById(num).innerHTML = "X";
            p1.push(num);
            player = true;
            chkWins(p1, "X", win_cases);
        } else if (player == true && document.getElementById(num).innerHTML == "") {
            document.getElementById(num).innerHTML = "O";
            p2.push(num);
            player = false;
            chkWins(p2, "O", win_cases);
        }else if(p1.length == 5 || p2.length == 5){
            // chkDraw(p1,p2);
            alert("Draw");
            clr_game();
        }
    }
    colorScore();
}

function chkWins(p, winner, win) {
    p.sort();
    for (i = 0; i < 8; i++) {

        isSubset = win[i].every(function (val) {
            return p.indexOf(val) >= 0;
        });

        if (isSubset) {
            win_label.innerHTML = "<b style='color:red;'>" + winner + "</b> is the winner this round";
            gEnd = true;
            if (winner == "X") {
                player = false;
                p1Score += 1;
                x.innerHTML = "X - " + p1Score;
            } else if (winner == "O") {
                player = true;
                p2Score += 1;
                o.innerHTML = "O - " + p2Score;
            }
        }
    }
}

function clr_game() {
    win_label.innerHTML = "";
    main_div.innerHTML = "";
    for (i = 1; i <= 9; i++) {
        main_div.innerHTML += '<div class="btnXO" id="' + i + '" onclick="playXO(' + i + ')">';
    }
    p1.length = 0;
    p2.length = 0;
}

function colorScore(){
    if(p1Score>p2Score){
        x.style = "border : 2px solid green";
        o.style = "border : none";
    }else if(p1Score==p2Score){
        x.style = "border : none";
        o.style = "border : none";

    }else if(p1Score<p2Score){
        x.style = "border : none";
        o.style = "border : 2px solid green";

    }
}
