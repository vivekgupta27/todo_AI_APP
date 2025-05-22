import { GoogleGenAI } from '@google/genai';
import supabase from '../config/supabaseClient.js';
import axios from "axios"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const summarize = async (req, res) => {
  const todos = res.locals.todos;
  const formattedTodos = todos.map((todo, index) => {
    return `${index + 1}. ${todo.title} - ${todo.completed ? 'Completed' : 'Pending'}`;
  }).join('\n');

  const prompt = `I have the following todo list:\n${formattedTodos}\n\nPlease summarize this list. How many tasks are done, how many are pending, and provide a short overall summary and it should be in plaintext and motivating quotes also.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const summaryText = response.text;
    const slackResponse = await axios.post(SLACK_WEBHOOK_URL, {
      text: summaryText,
    });

    if (slackResponse.status !== 200) {
      console.error("Failed to send message to Slack", slackResponse.data);
      return res.status(500).send("Summary generated but failed to send to Slack");
    }

    // Optionally respond back to client
    res.send({ summary: summaryText, slack: "Message sent to Slack successfully" })
  } catch (error) {

    res.status(500).send("Error generating AI response");
  }
};

export const fetchAndSummarize = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('TodoList').select('*');
    if (error) throw error;
    res.locals.todos = data;
    next();
  } catch (err) {
    res.status(500).send('Failed to fetch data.');
  }
};

export default summarize;
