async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}

const generateButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const messagesContainer = document.querySelector(".messages");

generateButton.addEventListener("click", async () => {
  const messageText = messageInput.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "user-message");
    messageElement.textContent = messageText;
    messagesContainer.appendChild(messageElement);
    messageInput.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const inputText = messageText; // Используем введенный текст для генерации
    const imageData = await query({ inputs: inputText });
    const imageUrl = URL.createObjectURL(imageData);

    const imageElement = document.createElement("img");
    imageElement.classList.add("img_container");
    imageElement.src = imageUrl;
    imageElement.alt = "Not availble";
    messagesContainer.appendChild(imageElement);
    
    
  }
});
