Demo : https://gemini-application-test.vercel.app/
## Sample Output
![Screenshot 2024-05-30 112020](https://github.com/SilvaLian0410/Simple-Gemini-Application/assets/105249133/ae61cfa2-6821-47ac-8ad7-a514572554d9)

## Getting Started

First, clone this respitory : 
```bash
git clone https://github.com/SilvaLian0410/Simple-Gemini-Application.git
```

Second, create an .env or copy the .env.sample file fill in : 
```bash
cp .env.sample .env
```
```bash
API_KEY_GEMINI_GOOGLE =
```

Third, run:
```bash
npm install
```

Fourth, run this command in the terminal and make sure it is listening to port 8000 : 
```bash
npm run start:backend
```
![Screenshot 2024-05-30 112046](https://github.com/SilvaLian0410/Simple-Gemini-Application/assets/105249133/d3f62bc9-343c-4ac9-9571-7902cb9ce984)


If you want to change the Port, change :
server.js :
```bash
const PORT = 8000;
```
App.js
```bash
const response = await fetch("http://localhost:8000/gemini", options);
```

Finally, run : 
```bash
npm run start:frontend
```

Enjoy :DD

## Deploy on Vercel
To deploy your application on Vercel or any hosting without, you'll need to make a few adjustments : 

First, split your project into two separate directories: frontend and backend

For the Backend (API):
Create a new directory called api in your project root

Move your server.js into the api directory and rename it to index.js

Modify the server code to work with Vercel:

Index.js
```bash
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI_GOOGLE);

// Convert Express app to Vercel serverless function
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      const chat = model.startChat({
        history: req.body.history
      });

      const result = await chat.sendMessage(req.body.message);
      const response = await result.response;
      const text = response.text();
      res.status(200).json(text);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

Update your package.json:

package.json
```bash
{
  "name": "gemini-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    // ... existing dependencies ...
  },
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "start": "react-scripts start",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  // ... rest of the file ...
}
```

Create a vercel.json file in your project root:

vercel.json
```bash
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

Update your frontend API calls to use the new API route:

App.js
```bash
const response = await fetch('/api/gemini', {
  // ... rest of your fetch configuration
});
```

Deploy to Vercel:

Install Vercel CLI: npm i -g vercel
Login to Vercel: vercel login
Deploy: vercel
Environment Variables:
Add your API_KEY_GEMINI_GOOGLE to your Vercel project settings
Go to Vercel Dashboard → Your Project → Settings → Environment Variables
Add the key-value pair there
