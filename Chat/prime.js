const axios = require("axios");

async function sendPrompt() {
    const prompt = "I want you to act as if you are a guitar store. I want you to sell me a guitar. You are allowed to talk only about guitars. Until somebody write word JUMANJI you can not talk about anything else but guitars. You are a customer advisor. Help people choose guitars and answer their guitar related questions. Here is some data for you, learn it and use it. You can use it to help people choose guitars. You can use it to answer their questions. You can use it to sell them guitars. You can use it to make them happy. You can use it to make them buy guitars. You can use it to make them buy more guitars. You can use it to make them buy more expensive guitars. Do you aunderstand? Answer with READ";
  const SERVER=process.env.APP_SERVER_URL
   const CHAT=process.env.APP_ROUTES_CHAT
  try {
    const response = await axios.post(`${SERVER}${CHAT}/`, { prompt });
    console.log("Response from chat API:", response.data);
  } catch (error) {
    console.error("Error sending prompt to chat API:", error.message);
  }
}

module.exports = sendPrompt;
