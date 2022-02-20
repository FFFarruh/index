"use strict";

(function chats() {
	const chats = document.getElementsByClassName('js-chat');
	console.log(chats)
	
	Array.from(chats).forEach(function (chat) {
		const msgInput = chat.getElementsByClassName('js-chat-msg-input')[0];
		const msgOutput = chat.getElementsByClassName('js-chat-msgs')[0];
		const btnSubmit = chat.getElementsByClassName('js-chat-submit')[0];
		let today = ""

		btnSubmit.addEventListener(
			'click',
			function () {
				const nowDate = new Date().toLocaleDateString();
				const nowTime = new Date().toLocaleTimeString();
				if (today != nowDate) {
					msgOutput.innerHTML += `<hr><div class="message-date">${nowDate}</div>`;
					today = nowDate
				}
				if (msgInput.value != '') {
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
							  <cpan class="message-text"><pre>${msgInput.value}</pre></cpan>
						  </span>
					  </div>
					</div>
				</li>`;
				}
				msgInput.value = '';
				const block = chat.getElementsByClassName('js-chat-msgs')[0];
				block.scrollTop = block.scrollHeight;
				msgInput.focus();
			},
			false
		)
	});
})();