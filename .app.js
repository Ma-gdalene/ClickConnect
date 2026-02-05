const notifications = document.getElementById("notifications");
const notifyButton = document.getElementById("notifyButton");
const bookingForm = document.getElementById("bookingForm");
const chatForm = document.getElementById("chatForm");
const chatBody = document.getElementById("chatBody");

const notificationTemplates = [
  "New inquiry received from %client% for a %type% session.",
  "%client% confirmed the %type% shoot at %time%.",
  "Deposit received for %client% — contract is ready to sign.",
  "Shot list uploaded. Review notes from %client% before the shoot.",
  "%client% opened the gallery link and started favoriting edits.",
];

const aiReplies = [
  "I can pencil in golden hour on Friday or Saturday. Which works best?",
  "Thanks for the details! I'll send a tailored package proposal now.",
  "Absolutely—I'll share a mood board and prep checklist within the hour.",
  "Would you like to add a second location or extra retouching?",
];

function addNotification(message) {
  const item = document.createElement("li");
  item.textContent = message;
  notifications.prepend(item);
}

function formatNotification(template, data) {
  return template
    .replace("%client%", data.name)
    .replace("%type%", data.type)
    .replace("%time%", data.time);
}

function handleBooking(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    name: formData.get("name"),
    type: formData.get("type"),
    time: formData.get("time"),
  };

  const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
  addNotification(formatNotification(template, data));
  addNotification(`AI Concierge: I've sent ${data.name} a scheduling confirmation.`);
  event.target.reset();
}

function handleNotificationButton() {
  const sample = {
    name: "Jordan Lee",
    type: "Branding",
    time: "Golden Hour",
  };
  addNotification(formatNotification(notificationTemplates[1], sample));
}

function appendChatMessage(message, type) {
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${type}`;
  bubble.textContent = message;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChat(event) {
  event.preventDefault();
  const input = event.target.elements.message;
  const message = input.value.trim();
  if (!message) {
    return;
  }
  appendChatMessage(message, "user");
  const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
  setTimeout(() => appendChatMessage(reply, "bot"), 400);
  input.value = "";
}

notifyButton.addEventListener("click", handleNotificationButton);
bookingForm.addEventListener("submit", handleBooking);
chatForm.addEventListener("submit", handleChat);

addNotification("AI Concierge is monitoring new inquiries.");
addNotification("Gallery preview sent to Ava + Noah.");


