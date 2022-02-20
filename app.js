"use strict";

(function chats() {
	const chats = document.getElementsByClassName('js-chat');
	console.log(chats)
	
	Array.from(chats).forEach(function (chat) {
		const msgInput = chat.getElementsByClassName('js-chat-msg-input')[0];
		const msgOutput = chat.getElementsByClassName('js-chat-msgs')[0];
		const btnSubmit = chat.getElementsByClassName('js-chat-submit')[0];
		let today = ""

		const send_msg = connection_server()
		send_msg.onmessage((event) => {
			 
			const nowDate = new Date().toLocaleDateString();
				const nowTime = new Date().toLocaleTimeString();
				if (today != nowDate) {
					msgOutput.innerHTML += `<hr><div class="message-date">${nowDate}</div>`;
					today = nowDate
				}
				
					msgOutput.innerHTML += `<hr><li class="chat__message">
					<div class="message-snippet">
					<div class="message-snippet__author">
					<div class="author">
							  <div class="author__avatar">
							  <div class="illustration"><img class="illustration__img" src="https://cdn.discordapp.com/avatars/164761664841842689/29ca5ab7bdc8c4eee968815ec0a0d78c.webp"></div>
							  </div>
							  </div>
							  </div>
							  <div class="message-snippet__msg">
							  <div class="message-snippet__info">
							  <div class="author__name">Духффф</div>
							  <span class="message-snippet__time">
							  ${nowTime}
							  </span>
							  </div>
							  <span class="message-snippet__text">
							  <cpan class="message-text"><pre>${event.data}</pre></cpan>
							  </span>
							  </div>
							  </div>
							  </li>`;
				
				const block = chat.getElementsByClassName('js-chat-msgs')[0];
				block.scrollTop = block.scrollHeight;
				msgInput.focus();
		})
		btnSubmit.addEventListener(
			'click',
			function () {
				if (msgInput.value != '') {
					send_msg.send(msgInput.value)
					msgInput.value = '';
				}
			},
			false
		)
	});
})();


function connection_server() {
	const exampleSocket = new WebSocket("ws://localhost:8765/");
	console.log(exampleSocket)

	exampleSocket.onerror = () => {
		console.log("Failed to connect to the server")
	}

	exampleSocket.onclose = () => {
		console.log("Server connection lost")
		// exampleSocket.send("Пользователь разорвал соединение")
	}
	return {
		send: (message_text) => {exampleSocket.send(message_text);},
		onmessage: (fn) => {exampleSocket.onmessage = fn}
	}
}
