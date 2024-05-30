import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who is the hottest Genshin Impact Character?",
    "Who is the most handsome Genshin Impact Character?",
    "Who is the sexiest female Genshin Impact Character?",
  ];

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask Silva a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);

      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something is Wrong, Please try again");
    }
  };

  const clear = () => {
    setError("")
    setValue("")
    chatHistory([])
  }

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  return (
    <div className="app">
      <p>
        What do you want to know from?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          Surprise Me
        </button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="Who is SilvaLian"
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask Me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, _index) => (
          <div key={"_index"}>
            <p className="answer">
              {chatItem.role} : {chatItem.parts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
