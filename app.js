"use strict";

function connection_server() {
	const exampleSocket = new WebSocket("ws://localhost:8765/");


	return exampleSocket	
}


function chats() {
	const chats = document.getElementsByClassName('js-chat');
	console.log(chats)
	
	Array.from(chats).forEach(function (chat) {
		const msgInput = chat.getElementsByClassName('js-chat-msg-input')[0];
		const msgOutput = chat.getElementsByClassName('js-chat-msgs')[0];
		const btnSubmit = chat.getElementsByClassName('js-chat-submit')[0];

		let today = "";
		let send_msg = connection_server();

		const onmessage = (event) => {
			
			let message = JSON.parse(event.data)
			console.log(message)
			 
			const nowDate = new Date().toLocaleDateString();
				const nowTime = new Date().toLocaleTimeString();
				if (today != nowDate) {
					msgOutput.innerHTML += `<hr><div class="message-date">${nowDate}</div>`;
					today = nowDate;
				}
				
					msgOutput.innerHTML += `<hr>
					<li class="chat__message">
						<div class="message-snippet">
							<div class="message-snippet__author">
								<div class="author">
									<div class="author__avatar">
										<div class="illustration">
											<img class="illustration__img" src="https://cdn.discordapp.com/avatars/164761664841842689/29ca5ab7bdc8c4eee968815ec0a0d78c.webp">
										</div>
									</div>
								</div>
							</div>
							<div class="message-snippet__msg">
								<div class="message-snippet__info">
									<div class="message-snippet__username">Духффф</div>
									<span class="message-snippet__time">
										${nowTime}
									</span>
								</div>
								<span class="message-snippet__text">
									<cpan class="message-text"><pre>${message}</pre></cpan>
								</span>
							</div>
						</div>
					</li>`;
				
				const block = chat.getElementsByClassName('js-chat-msgs')[0];
				block.scrollTop = block.scrollHeight;
				msgInput.focus(); /* TODO Переделать на нажатие кнопки */
		}



		const tryingReconnect = () => {
			console.log("Trying to reconnect");
			const onerror = () => {
				console.log("Failed to connect to the server")
				setTimeout(tryingReconnect, 1000);
			}

			send_msg.removeEventListener('message', onmessage);
			send_msg.removeEventListener('close', tryingReconnect);
			send_msg.removeEventListener('error', onerror);

			send_msg = null;
			send_msg = connection_server();

			send_msg.addEventListener('message', onmessage);
			send_msg.addEventListener('close', tryingReconnect);
			send_msg.addEventListener('error', onerror);

		}

		send_msg.addEventListener('message', onmessage);
		send_msg.addEventListener('close', tryingReconnect);

		btnSubmit.addEventListener(
			'click',
			() => {
				if (msgInput.value != '') {
					const message_text = { btn: "Submit", message: msgInput.value };
					const jsonMessage_text = JSON.stringify(message_text)
					send_msg.send(jsonMessage_text);
					msgInput.value = '';
				}
			},
			false);
	});
};

chats();

function user_identification() {
	const section_array = document.getElementsByClassName('js-section');
	console.log(section_array);
	
	Array.from(section_array).forEach(function (section) {
        const loginInput = section.getElementsByClassName('js-section-login-input')[0];
        const passwordInput = section.getElementsByClassName('js-section-password-input')[0];
		const btnRegistration = section.getElementsByClassName('js-btm-registration')[0];
        const btmAutorization = section.getElementsByClassName('js-btm-autorization')[0];

		const send_account = connection_server(); // TODO: Переделать на 1 соединение
		console.log(send_account);

		const button = document.createElement('button');
		document.body.appendChild(button);

		button.addEventListener('click')

		const onmessage = (event) => {
			let message = JSON.parse(event.data)
			console.log("Reg: ", message);
		}
		send_msg.addEventListener('message', onmessage);

		if (btmAutorization == undefined) {
			const registration = () => {
				if (loginInput.value != "" && passwordInput != "") {
					let data = {
						btn: "Registration",
						login: loginInput.value,
						password: passwordInput.value,
					}
					let jsonData = JSON.stringify(data)
					console.log(jsonData);
					send_account.send(jsonData);
				}
			}
			btnRegistration.addEventListener('click', registration, false);
		} else {
			const autorization = () => {
				if (loginInput.value != "" && passwordInput != "") {
					let data = {
						btn: "Autorization",
						login: loginInput.value,
						password: passwordInput.value,
					}
					let jsonData = JSON.stringify(data)
					console.log(jsonData);
					send_account.send(jsonData);
					
				}
			}
			btmAutorization.addEventListener('click', autorization, false);
		}
	});
};

user_identification();

