// select elements
const messageList = document.querySelector('.message-list');
const inputField = document.querySelector('input');
const sendButton = document.querySelector('button');

// define message types
const MessageType = {
    SENT: 'sent',
    RECEIVED: 'received'
};

// define function to create a new message element
function createMessageElement(type, content) {
    const li = document.createElement('li');
    li.classList.add('message', type);
    const span = document.createElement('span');
    span.classList.add('message-content');
    span.innerText = content;
    li.appendChild(span);
    messageList.appendChild(li);
}

// define function to handle sending a message
function sendMessage() {
    const message = inputField.value.trim(); // remove the empty spaces at the beginning and end of the text area
    if (message !== '') {
        createMessageElement(MessageType.SENT, message);
        inputField.value = '';
    }
}

// add event listeners
inputField.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});


sendButton.addEventListener('click', event => {
    event.preventDefault();
    sendMessage();
});
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
