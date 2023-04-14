import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactCanvasConfetti from "react-canvas-confetti";
import "./Quiz.css";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2
    }
  };
}

const Quiz = ({ quizData }) => {
  const navigate = useNavigate()
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [response, setResponse] = useState({});
  const { question, choices } = quizData[0].quiz_questions[activeQuestion];
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();
  
  const onClickNext = async () => {
    setSelectedAnswerIndex(null);
    answers.push(selectedAnswer);
    if (activeQuestion !== quizData[0].quiz_questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } 
    else {

      const res = await axios.post("api/blog/quiz/answers", {
        id: quizData[0]._id,
        answers,
      });

      setResponse(res);
      setShowResult(true);
      setActiveQuestion(0);
    }
  };

  const onAnswerSelected = (index) => {
    setSelectedAnswerIndex(index == undefined ? 0 : index);
    if (index) {
      setSelectedAnswer(index);
    } else {
      setSelectedAnswer(index == undefined ? 0 : index);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="quiz-container">
       <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
       <ToastContainer />
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
            navigate("/checkout", {state:{id: quizData[0]._id, status:"success", price: 0, shippingCharge: 100, hasInventory: true, isQuiz: true}})
          ) : response.data.status && !response.data?.canShowAddress ? (
            navigate("/checkout", {state:{id: quizData[0]._id, status:"success", price: quizData[0]?.price, shippingCharge: 100, hasInventory: false,  isQuiz: true}})
          ) : (
            navigate("/checkout", {state:{id: quizData[0]._id, status:"false", price: quizData[0]?.price, shippingCharge: 100,  isQuiz: true}})
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;