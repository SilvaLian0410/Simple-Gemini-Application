
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

