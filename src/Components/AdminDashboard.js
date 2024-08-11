import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (err) {
      console.error('Error fetching flashcards:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/flashcards/${editId}`, { question, answer });
    } else {
      await axios.post('http://localhost:5000/api/flashcards', { question, answer });
    }
    setQuestion('');
    setAnswer('');
    setEditId(null);
    fetchFlashcards();
  };

  const handleEdit = (flashcard) => {
    setQuestion(flashcard.question);
    setAnswer(flashcard.answer);
    setEditId(flashcard.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
    fetchFlashcards();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Flashcard</button>
      </form>
      <ul>
        {flashcards.map((flashcard) => (
          <li key={flashcard.id}>
            <strong>{flashcard.question}</strong> - {flashcard.answer}
            <button onClick={() => handleEdit(flashcard)}>Edit</button>
            <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
