// Bounce.js

var COUNT = 0;
var TMP = 0;
var balls = [];
var ballid = [];
var bStatue = [];
var bRadius = [];
var canvas;
var bsize = 5;
var bcolor = "black";
var bColor = [];
var mouseX = 0;
var mouseY = 0;
var CREATE = 0;
var click = 0;
var nowcount = 0;

//아래는 표시하는 것
// Initialize Firebase
function setupFirebase() {
    var config = {
        apiKey: "AIzaSyBDwQORDHQUedBU8h7-YbFJh5gDygnGalM",
        authDomain: "webpro-e4e27.firebaseapp.com",
        databaseURL: "https://webpro-e4e27.firebaseio.com",
        projectId: "webpro-e4e27",
        storageBucket: "webpro-e4e27.appspot.com",
        messagingSenderId: "952439973434"

    };//firebase install 정의
    firebase.initializeApp(config);

    var ref = firebase.database().ref("ball");
    //테이블추가
    ref.on("child_added", function (snap) {
        var list = document.getElementById("list");
        const tr = document.createElement("tr");
        const td_bid = document.createElement("td");
        const td_bcolor = document.createElement("td");
        const td_bradi = document.createElement("td");
        const td_status = document.createElement("td");

        td_bid.innerText = snap.child("ID").val();
        td_bcolor.innerText = snap.child("Color").val();
        td_bradi.innerText = snap.child("Radius").val();
        td_status.innerText = snap.child("Status").val();

        tr.appendChild(td_bid);
        tr.appendChild(td_bcolor);
        tr.appendChild(td_bradi);
        tr.appendChild(td_status);

        ballid[COUNT] = snap.child("ID").val();

        if (isNaN(parseInt(snap.child("Color").val())) == true)
            bColor[COUNT] = snap.child("Color").val();
        else
            bColor[COUNT] = bcolor;

        if (isNaN(parseInt(snap.child("Radius").val())) == true)
            bRadius[COUNT] = 5
        else if (parseInt(snap.child("Radius").val()) < 5)
            bRadius[COUNT] = 5
        else
            bRadius[COUNT] = parseInt(snap.child("Radius").val())

        bStatue[COUNT] = snap.child("Status").val();
        tr.id = snap.key;
        list.appendChild(tr);

        /*
        var readd = firebase.database().ref()
        dbTestRef.on('child_added', function(data){
            console.log(data.val())
        })*/
        if (snap.child("Status").val() == "Activate") nowcount += 1;
        COUNT += 1;
    });
}



window.onload = function () {
    setupFirebase();

    canvas = document.getElementById("my_canvas");
    canvas.onmousemove = function (evt) {
        var rect = canvas.getBoundingClientRect();
        mouseX = evt.clientX - rect.left;
        mouseY = evt.clientY - rect.top;
    }
    canvas.addEventListener("click", function () {
        click = 1
    });
    canvas.onmouseout = function (evt) {

        mouseX = -1
        mouseY = -1
    }

    myLoop()
}

function myLoop() {

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector("#pos").innerHTML = mouseX + " / " + mouseY;
    if (nowcount) {
        if (CREATE == 0) {
            setBall()
        }
        nowcount = 0;
        if (COUNT != TMP) {
            balls.push(new Ball(canvas.width, canvas.height, bRadius[COUNT - 1], bColor[COUNT - 1], COUNT - 1))
            TMP = COUNT
        }
        for (x = 0; x < balls.length; x++) {
            if (bStatue[x] == "Activate") {
                balls[x].draw(ctx)
                balls[x].update()
                nowcount += 1;
            }
        }
    }
    document.querySelector("#cou").innerHTML = nowcount + " / " + COUNT;
    click = 0;
    setTimeout(myLoop, 1000 / 70);
}

function setBall() {
    for (x = 0; x < COUNT; x++) {
        balls.push(new Ball(canvas.width, canvas.height, bRadius[x], bColor[x], x));
    }
    CREATE = 1
    TMP = COUNT
}
/*
function ClickEvent(num) {
    if (Math.abs(mouseX - balls[num].x) < balls[num].radius && Math.abs(mouseY - balls[num].y) < balls[num].radius) {
        bStatue[num] = "Delete"
        var clearONE = 0;
        var refs = firebase.database().ref("ball");
        refs.on("child_added", function (snap) {
            if (snap.child("ID").val() == ballid[num]) {
                if (clearONE == 0) {
                firebase.database().ref("ball/" + snap.key).update({ Status: "Delete" });
                var list = document.getElementById("list");
                for (x = 0; x <= 1 + COUNT; x++) {
                    if (list.childNodes[x].id == snap.key) {
                        list.childNodes[x].childNodes[3].innerText = "Delete";
                        console.log(list.childNodes[x]);
                        clearONE++;
                    }
                }
                }
            }
        })

    }
}*/

function ClickEvent(num) {
    if (Math.abs(mouseX - balls[num].x) < balls[num].radius && Math.abs(mouseY - balls[num].y) < balls[num].radius) {
        bStatue[num] = "Delete"
        var list = document.getElementById("list");
        firebase.database().ref("ball/" + list.childNodes[num + 2].id).update({ Status: "Delete" });
        list.childNodes[num + 2].childNodes[3].innerText = "Delete";
        console.log(list.childNodes[num + 2]);
    }
}

function Ball(width, height, Radius, Color, num) {

    this.width = width;
    this.height = height;


    this.x = parseInt(Math.random() * width);
    this.y = parseInt(Math.random() * height);
    this.radius = Radius;
    this.color = Color;

    this.x_speed = 2 + parseInt(Math.random() * 3);
    this.y_speed = this.x_speed;



    this.update = function () {
        if (mouseX > 0 && mouseY > 0) {
            if (Math.abs(mouseX - this.x) < this.radius && Math.abs(mouseY - this.y) < this.radius) {
                if (click == 1) ClickEvent(num)

                /*
                 if(this.radius <50 )
                     this.radius += 5;
             }else{
                 if(this.radius >10 )
                     this.radius +=-1;
                 */
            }
        }


        if (this.x > (this.width - this.radius))
            this.x_speed = this.x_speed * -1;
        if (this.x < this.radius)
            this.x_speed = this.x_speed * -1;
        this.x += this.x_speed;

        if (this.y > (this.height - this.radius))
            this.y_speed = this.y_speed * -1;
        if (this.y < this.radius)
            this.y_speed = this.y_speed * -1;
        this.y += this.y_speed;
    }

    this.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }


}

