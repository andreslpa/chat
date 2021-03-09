const ws = new WebSocket("ws://localhost:3000");

const apiUrl = 'http://localhost:3000/chat/api/messages'

ws.onmessage = (msg) => {
  fetch(apiUrl)
  .then(res => res.json())
  .then(body => {
    renderMessages(body);
  });  
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item.message} <br> Autor: ${item.author}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const messageHtml = document.getElementById("message");
  const authorHtml = document.getElementById("author");

  let data = {
    message: messageHtml.value,
    author: authorHtml.value
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then((res) => {
  if (res.status == 400) return res.text();
  return "";
  })
  .then(body => {
    ws.send("Update");
    document.getElementById ("error").innerHTML = body;
  })
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);