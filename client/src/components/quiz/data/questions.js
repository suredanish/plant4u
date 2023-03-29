import React, { useEffect, useState } from "react";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/blog/peace")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.quiz_questions);
        console.log(questions);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return <div>questions</div>;
};

export default Questions;
