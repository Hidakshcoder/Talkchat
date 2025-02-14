const firebaseConfig = {
  apiKey: "AIzaSyDqM3RtWOynG72MBKueIReCu2S-ZQcLESo",
  authDomain: "tell-and-talk.firebaseapp.com",
  databaseURL: "https://tell-and-talk-default-rtdb.firebaseio.com",
  projectId: "tell-and-talk",
  storageBucket: "tell-and-talk.firebasestorage.app",
  messagingSenderId: "579539761154",
  appId: "1:579539761154:web:a8c7c2ad083cb0fb34cf1b"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);
    window.location = "talkchat_page.html";
}

function getData() {
    firebase.database().ref("/").once('value', function(snapshot) {
        document.getElementById("output").innerHTML = ""; // Clear previous rooms
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);

            // Create and append the room entry
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}

getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "talkchat_page.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
