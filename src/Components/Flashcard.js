import React, { useState } from "react";
import "./Flashcard.css"; // CSS for flip animation

const Flashcard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="front">
          <h2>
            Question{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(question);
              }}
            >
              🔊
            </button>
          </h2>

          <p>{question}</p>
          <h4>Click here to flip</h4>
        </div>
        <div className="back">
          <h2>
            Answer{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(answer);
              }}
            >
              🔊
            </button>
          </h2>

          <p>{answer}</p>
          <h5>Click here to flip</h5>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
