// Initialize Firebase
function setupFirebase(){
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
    ref.on("child_added", function(snap){
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

        tr.id = snap.key;
        list.appendChild(tr);
    });
}

window.onload = function(){
    setupFirebase();//데이터 베이스 설치
    var btnSave = document.getElementById("btnSave");//save 버튼 누르면 firebase에 입력
    btnSave.addEventListener("click", function(){
        var ID = document.getElementById("ID").value;
        var Color = document.getElementById("Color").value;
        var Radius = document.getElementById("Radius").value;
        var Status = "Activate";

//각각 로그 남김
        console.log(ID);
        console.log(Color);
        console.log(Radius);
        console.log(Status);
//기록
        firebase.database().ref().child("ball").push().set({
            ID : ID,
            Color : Color,
            Radius : Radius,
            Status : Status
        });//각각 상응하게 대입
    });



}