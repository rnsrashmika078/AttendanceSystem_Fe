import React, { useEffect, useState,  } from "react";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCWoGfvkQq8lsNPWQYeTuYDDzRN2x4AVOs", // Replace with your actual API key
});

const Gemini = () => {

  
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  const [editable, setEditable] = useState(true);
  const [currentLength, setCurrentLength] = useState(0);

  const maxLength = 40;
  const handlePromptChange = (e) => {
    const value = e.target.value;
    setCurrentLength(value.length);
    setEditable(value.length <= maxLength);
    if (value.length <= maxLength) {
      setUserInput(value);
    } else {
      setUserInput();
    }
  };
  const user = "Guest";

  const fetchAiResponse = async () => {
    if (!editable) {
      setUserInput("");
      setEditable(true);
      return;
    }
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userInput ? `${userInput}.short answer.just one line` : null,
      });
      setAiResponse(response.text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching response. Please check your API key.");
    }
  };

  return (
    <div className="bg-gray-100 py-2 px-2">
      <div className="max-w-lg mx-auto bg-gray-200 px-5  text-black p-6 rounded-2xl shadow-1xl text-center w-full">
        <h2 className="text-2xl font-bold mb-4 px-auto ">AI Assistant</h2>
        {/* {!isOpen ? (
          <div>
            <button className="border-2 p-2 rounded-3xl bg-blue-700 text-white" onClick={() => setIsOpen(true)}>
              Open
            </button>
          </div>
        ) : ( */}
          <div className="flex flex-col sm:flex-col  gap-5 mx-0 sm:mx-10 mt-5">
            <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 w-full max-w-md">
              <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                {currentLength}
                {"/"}
                {maxLength}
              </div>

              <input
                type="text"
                name="username"
                id="username"
                className="block min-w-0 flex-1 py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                placeholder={`Hey ${user}..! How can i help you today?`}
                value={userInput}
                onChange={(e) => handlePromptChange(e)}
              />
              <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                <button
                  disabled={userInput ? false : true}
                  className={`flex align-center  justify-center px-2 ${
                    userInput ? "bg-black hover:bg-indigo-800" : "bg-gray-300"
                  } transition-all duration-300 rounded-xl shadow-md text-lg font-semibold text-white`}
                  onClick={() => fetchAiResponse()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {aiResponse ? (
              <div className=" mt-4 p-4 bg-white text-gray-800 rounded-xl shadow-md min-h-[50px]">
                <p className="text-xl font-medium">{aiResponse}</p>
              </div>
            ) : null}
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Gemini;
