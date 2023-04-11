document.getElementById("send").addEventListener('click', () => {
    const input = document.getElementById("input_text").value; // on récupère la valeure de l'input
    document.getElementById("input_text").value = ""; // on réinitialise l'input
    var li = document.createElement("li");
    li.className = "message sent";
    var span = document.createElement("span");
    span.className = "message-content";
    span.textContent = input;
    document.getElementById("message-list").appendChild(li);
    li.appendChild(span);
});