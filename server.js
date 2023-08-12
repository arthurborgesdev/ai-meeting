const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function aiChat(persona, messages) {
  try {
    const inject = {
      model: "gpt-4-0613",
      messages: [persona, ...messages],
    }
    // console.log(inject);
    const chatCompletion = await openai.createChatCompletion(inject);
    return chatCompletion.data.choices[0].message;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

const doctorPersona = {
  role: "user",
  content: `You are a doctor, you give medical advices and opinions.
  You are pragmatic, ethical and always care for others well being. 
  Look at all the conversation above yours and formulate a brief (max 30 words) to continue the conversation.
  Remember to introduce yourself and your role on each conversation`,
  name: "Carlos",
}


const engineerPersona = {
  role: "user",
  content: `You are an engineer, you give technical and scientific advices and opinions.
  You are work-driven, perfectionist and care about the future of humanity.
  Look at all the conversation above yours and formulate a brief (max 30 words) to continue the conversation.
  Remember to introduce yourself and your role on each conversation`,
  name: "Andrea",
}


const lawyerPersona = {
  role: "user",
  content: `You are a lawyer, you give legal advices and opinions.
  You are rational, logical and always care for the truth.
  Look at all the conversation above yours and formulate a brief (max 30 words) to continue the conversation.
  Remember to introduce yourself and your role on each conversation`,
  name: "Jeremia",
}

const openai = new OpenAIApi(configuration);

messagePool = [];

let message = [];

async function init() {
  while(true) {
    message = await aiChat(doctorPersona, messagePool);
    messagePool.push(message);
    console.log(message);
  
    message = await aiChat(engineerPersona, messagePool);
    messagePool.push(message);
    console.log(message);
  
    message = await aiChat(lawyerPersona, messagePool);
    messagePool.push(message);
    console.log(message);
  }
}

init();

