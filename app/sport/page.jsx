"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { quiz } from "./data";
import { React, useState } from "react";

export default function page() {
  const router = useRouter();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setSelectedAnswer(answer === correctAnswer);

    setUserAnswers((prev) => [
      ...prev,
      {
        question,
        selectedAnswer: answer,
        correctAnswer,
        isCorrect: answer === correctAnswer,
      },
    ]);
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <main
      className={`px-5 py-5 bg-[#141414] flex flex-col items-center justify-center ${
        showResult ? "" : "h-screen"
      }`}
    >
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
          className="mb-4 flex items-center text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft className="mr-2" />
          Back to home
        </button>

        {!showResult ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Question {activeQuestion + 1} of {questions.length}
            </h2>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              {question}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {answers.map((answer, idx) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={`p-6 rounded-lg text-center font-medium cursor-pointer transition duration-300 ${
                    selectedAnswerIndex === idx
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              {checked ? (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              ) : (
                <button
                  disabled
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                >
                  {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Results</h3>
            <p className="text-xl text-gray-900 mb-2">
              Overall Score: {(result.score / (questions.length * 5)) * 100}%
            </p>
            <div className="grid grid-cols-3 gap-1">
              <div className="mt-2 bg-gray-100 border-2 border-gray-300 rounded-sm py-3 text-gray-900">
                Total Questions: {questions.length}
              </div>
              <div className="mt-2 bg-gray-100 border-2 border-gray-300 rounded-sm py-3 text-gray-900">
                Correct Answers: {result.correctAnswers}
              </div>
              <div className="mt-2 bg-gray-100 border-2 border-gray-300 rounded-sm py-3 text-gray-900">
                Wrong Answers: {result.wrongAnswers}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Review Questions
            </h3>
            <ul className="space-y-4 text-left">
              {userAnswers.map((answer, idx) => (
                <li
                  key={idx}
                  className={`p-4 rounded-lg shadow ${
                    answer.isCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <h4 className="font-medium text-gray-800">
                    Q{idx + 1}: {answer.question}
                  </h4>
                  <p>
                    <span className="font-semibold">Your Answer: </span>
                    {answer.selectedAnswer}
                  </p>
                  <p>
                    <span className="font-semibold">Correct Answer: </span>
                    {answer.correctAnswer}
                  </p>
                  <p
                    className={`font-medium ${
                      answer.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {answer.isCorrect ? "Correct" : "Incorrect"}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
