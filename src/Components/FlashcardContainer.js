import React, { useState } from "react";
import Flashcard from "./Flashcard";
import "./Flashcard.css";
const FlashcardContainer = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () =>
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  const prevCard = () =>
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);

  return (
    <div>
      <Flashcard {...flashcards[currentIndex]} />
      <div className="clickButton">
        <button className="btn" onClick={prevCard}>
          Previous
        </button>
        <button className="btn" onClick={nextCard}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardContainer;
