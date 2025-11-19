# OldMoney Bot – Smart Savings Chatbot

## Overview
OldMoney Bot is a fintech chatbot designed to help Namibians improve their savings habits. It provides personalized financial advice, helps users set savings goals, and tracks progress through a conversational interface. The app leverages AI and behavioral science to make saving money engaging and accessible.

## Problem Framing
Namibians face significant challenges in saving consistently due to economic pressures, cultural obligations, and limited financial literacy. Many struggle with low disposable income, high debt uptake, and a lack of accessible tools to build good savings habits. OldMoney Bot addresses these challenges by providing empathetic, localized guidance and actionable savings plans.

## Features
- **Chat Interface**: Users interact with OldMoney Bot to set savings goals, get advice, and track progress.
- **AI-Powered Responses**: The bot uses OpenAI GPT to provide tailored financial tips and encouragement.
- **Savings Goal Tracking**: Users can create savings goals, and the bot helps break them into manageable steps.
- **Behavioral Nudges**: Positive reinforcement and reminders to build discipline and improve financial habits.

## Tech Stack
- **Frontend**: React with Next.js for a responsive and dynamic user interface.
- **Backend**: Next.js API routes for server-side logic and integration with OpenAI.
- **Database**: Supabase (PostgreSQL) for storing user goals and chat history.
- **AI Service**: OpenAI GPT-4 for conversational intelligence.

## Installation
### Prerequisites
- Node.js and npm installed
- Supabase account with API keys
- OpenAI API key

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ewliwtaan/oldmoney-bot.git
   cd oldmoney-bot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   OPENAI_API_KEY=<your-openai-api-key>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the app in your browser at `http://localhost:3000`.

## Usage
1. Interact with the chatbot on the homepage to set savings goals and get advice.
2. Use natural language commands like "Help me save N$5000 in 3 months".
3. View your conversation history and track progress.

## Deployment
The app can be deployed using Vercel:
1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Set up environment variables in the Vercel dashboard.
4. Deploy and share the live URL.

## Responsible AI
OldMoney Bot uses AI responsibly to provide helpful, non-judgmental financial advice. It avoids giving explicit investment recommendations and ensures user data privacy.

## Future Enhancements
- Integration with WhatsApp for broader accessibility.
- Multi-goal support and advanced tracking features.
- Localization for Namibian languages and cultural contexts.

## License
This project is open-source and available under the MIT License.

---

OldMoney Bot is a step toward improving financial wellness in Namibia. We hope it inspires better savings habits and empowers users to achieve their financial goals.