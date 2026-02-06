const notifications = document.getElementById("notifications");
const notifyButton = document.getElementById("notifyButton");
const bookingForm = document.getElementById("bookingForm");
const chatForm = document.getElementById("chatForm");
const chatBody = document.getElementById("chatBody");
const inboxForm = document.getElementById("inboxForm");
const conversation = document.getElementById("conversation");
const agentForm = document.getElementById("agentForm");
const agentBody = document.getElementById("agentBody");

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
  if (!notifications) {
    return;
  }
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
  if (!chatBody) {
    return;
  }
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

function appendConversation(message, type = "user") {
  if (!conversation) {
    return;
  }
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${type}`;
  bubble.textContent = message;
  conversation.appendChild(bubble);
  conversation.scrollTop = conversation.scrollHeight;
}

function handleInbox(event) {
  event.preventDefault();
  const input = event.target.elements.message;
  const message = input.value.trim();
  if (!message) {
    return;
  }
  appendConversation(message, "user");
  input.value = "";
}

const agentKnowledge = {
  pricing: {
    graduation: "GHS 350",
    matriculation: "GHS 300",
    birthday: "GHS 250",
    family: "GHS 450",
    premium: "GHS 1,500",
  },
  availability: [
    "Apr 30 · Golden Hour",
    "May 03 · Morning",
    "May 05 · Afternoon",
  ],
  addOns: [
    "Highlight video (GHS 400)",
    "Instagram reels (2) (GHS 200)",
    "Full event film (GHS 1,000)",
    "Rush gallery delivery",
  ],
};

function formatAvailability() {
  return agentKnowledge.availability.join(", ");
}

function generateAgentReply(message) {
  const text = message.toLowerCase();
  if (text.includes("price") || text.includes("cost")) {
    return `Here are current package rates: Graduation ${agentKnowledge.pricing.graduation}, Matriculation ${agentKnowledge.pricing.matriculation}, Birthday ${agentKnowledge.pricing.birthday}, Family ${agentKnowledge.pricing.family}, Premium story day ${agentKnowledge.pricing.premium}.`;
  }
  if (text.includes("availability") || text.includes("available") || text.includes("slots")) {
    return `The next available sessions are ${formatAvailability()}. Want me to reserve one?`;
  }
  if (text.includes("book") || text.includes("reserve")) {
    return "Great! I can lock in a session. Which date and time window should I hold for you?";
  }
  if (text.includes("gallery") || text.includes("portfolio")) {
    return "I can share your gallery link or show recent graduation, matriculation, birthday, and family examples. What would you like?";
  }
  if (text.includes("add-on") || text.includes("extra")) {
    return `Popular add-ons include ${agentKnowledge.addOns.join(", ")}. Want details on any of those?`;
  }
  if (text.includes("video") || text.includes("reel")) {
    return "Video options include a highlight video (GHS 400), Instagram reels (2) (GHS 200), or a full event film (GHS 1,000). Which one fits your shoot?";
  }
  if (text.includes("hello") || text.includes("hi")) {
    return "Hi there! I can help you book a session, confirm availability, or review packages.";
  }
  return "Thanks for the note! I can help with pricing, availability, or booking—what would you like to explore first?";
}

function appendAgentMessage(message, type) {
  if (!agentBody) {
    return;
  }
  const bubble = document.createElement("div");
  bubble.className = `chat-message ${type}`;
  bubble.textContent = message;
  agentBody.appendChild(bubble);
  agentBody.scrollTop = agentBody.scrollHeight;
}

function handleAgent(event) {
  event.preventDefault();
  const input = event.target.elements.message;
  const message = input.value.trim();
  if (!message) {
    return;
  }
  appendAgentMessage(message, "user");
  const reply = generateAgentReply(message);
  setTimeout(() => appendAgentMessage(reply, "bot"), 300);
  input.value = "";
}

if (notifyButton) {
  notifyButton.addEventListener("click", handleNotificationButton);
}
if (bookingForm) {
  bookingForm.addEventListener("submit", handleBooking);
}
if (chatForm) {
  chatForm.addEventListener("submit", handleChat);
}
if (inboxForm) {
  inboxForm.addEventListener("submit", handleInbox);
}
if (agentForm) {
  agentForm.addEventListener("submit", handleAgent);
}

if (notifications) {
  addNotification("AI Concierge is monitoring new inquiries.");
  addNotification("Gallery preview sent to Ava + Noah.");
}
