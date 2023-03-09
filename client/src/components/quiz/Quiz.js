import React, { useEffect, useState } from "react";
import "./Quiz.css";
import axios from "axios";
import Form from "./Form";
// import {quiz} from './data/questions'

const Quiz = ({ quizData, isModelOpen }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  // const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [response, setResponse] = useState({});

  const { question, choices } = quizData[0].quiz_questions[activeQuestion];

  const onClickNext = async () => {
    setSelectedAnswerIndex(null);
    answers.push(selectedAnswer);
    if (activeQuestion !== quizData[0].quiz_questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      // console.log({
      //   id: quizData[0]._id,
      //   answers
      // })
      const res = await axios.post("api/blog/quiz/answers", {
        id: quizData[0]._id,
        answers,
      });

      setResponse(res);

      if (res.data.status && res.data?.canShowAddress) {
        console.log("enter address and free");
      } else if (res.data.status && !res.data?.canShowAddress) {
        // console.log("enter address but not free all coupons expired")
        <Form />;
      } else {
        console.log("buy plants");
      }

      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (index) => {
    setSelectedAnswerIndex(index == undefined ? 0 : index);
    // console.log(selectedAnswerIndex)
    if (index) {
      setSelectedAnswer(index);
    } else {
      setSelectedAnswer(index == undefined ? 0 : index);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(quizData[0].quiz_questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? "selected-answer" : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === quizData[0].quiz_questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          {response.data.status && response.data?.canShowAddress ? (
            // <h1>hiiiiii</h1>
            <Form />

          ) : response.data.status && !response.data?.canShowAddress ? (
            <Form />
          ) : (
            // <h3>byeeeee</h3>
            <Form />
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
