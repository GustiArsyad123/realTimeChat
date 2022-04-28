window.onload = function () {
  let messages = [];
  let socket = io.connect("http://localhost:3800");
  let field = document.getElementById("field");
  let sendButton = document.getElementById("send");
  let content = document.getElementById("content");
  let name = document.getElementById("name");

  //message listener
  socket.on("message", function (data) {
    if (data.message) {
      messages.push(data);
      let html = "";
      for (let i = 0; i < messages.length; i++) {
        html +=
          "<b>" +
          (messages[i].username ? messages[i].username : "Server") +
          ": </b>";
        html += messages[i].message + "<br />";
      }
      content.innerHTML = html;
      content.scrollTop = content.scrollHeight;
    } else {
      console.log("There is a problem:", data);
    }
  });
  // button to send message to socket
  sendButton.onclick = function () {
    if (name.value == "") {
      alert("Please type your name!");
    } else {
      let text = field.value;
      socket.emit("send", { message: text, username: name.value });
      field.value = "";
    }
  };
  // set enter key listener
  field.addEventListener("keypress", function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) {
      sendButton.onclick();
    }
  });
};
