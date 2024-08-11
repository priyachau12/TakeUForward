// import "./App.css";
// import FlashcardContainer from "./Components/FlashcardContainer.js";
// import flashcards from "./Components/mockFlashcards";
// function App() {
//   return (
//     <div className="App">
//       <h1>Flashcard Learning Tool</h1>
//       <FlashcardContainer flashcards={flashcards} />
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlashcardContainer from "./Components/FlashcardContainer";
import AdminDashboard from "./Components/AdminDashboard";
import flashcards from "./Components/mockFlashcards.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<FlashcardContainer flashcards={flashcards} />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
