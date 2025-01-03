'use client';

import React, { 
    useState, 
    useRef, 
    useEffect, 
    createRef, 
    forwardRef,
    useLayoutEffect
} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {v4 as uuidv4} from "uuid";
import SingleQuestion from "./SingleQuestion";
import toast,{Toaster} from "react-hot-toast";
import Choices from "./Choices";
import { preconnect } from "react-dom";

function QuizBuildQuestions({focusProp,quizQuestions, setQuizQuestions}) {
    const prefixes = ['A.', 'B.', 'C.', 'D.'];
    const {focus, setFocusFirst} = focusProp;
    const endOfListRef = useRef(null);
    const textAreaRefs = useRef(quizQuestions.map(() => createRef()));

    console.log(quizQuestions);
    //
    // Add a new question to the quiz
    //
    function addNewQuestion() {
        setFocusFirst(false);
        // This code below tp verify if the last question is empty or not
        //-------------------------------------------
        const lastIndexQuizQuestions = quizQuestions.length - 1;
        if (
            quizQuestions[lastIndexQuizQuestions]?.mainQuestion.trim().length === 0
        ) {
            toast.error(`The question ${lastIndexQuizQuestions + 1} is still empty`);
            textAreaRefs.current[lastIndexQuizQuestions]?.current.focus();
            return;
        }

        // This code check out if all the previous choices input are not empty
        //-------------------------------------------
        for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
            const singleChoice = choice.substring(2);
            if (singleChoice.trim(' ').length === 0) {
                return toast.error(
                    `Please ensure that all choices for question ${lastIndexQuizQuestions + 1} are filled out!`,
                );
            }
        }

        // This code check out if all the correct answer input is not empty
        //-------------------------------------------
        if (quizQuestions[lastIndexQuizQuestions]?.correctAnswer.length === 0) {
            return toast.error(`Please ensure to fill out the correct answer`);
        }

        //-------------------------------------------

        // The code create a new question
        //-------------------------------------------
        const newQuetion = { 
            id: uuidv4(), 
            mainQuestion: "", 
            choices: prefixes.slice(0, 2).map((prefix) => prefix + ' '),
            correctAnswer: "",
            answeredResult: -1,
            statistics: {
                totalAttempts: 0,
                correctAttempts: 0,
                incorrectAttempts: 0,
            },
        };
        setQuizQuestions([...quizQuestions, newQuetion]);
        textAreaRefs.current = [...textAreaRefs.current, createRef()];
        //-------------------------------------------
    }

    function deleteQuestion(singleQuestion) {
        const updatedQuestions = quizQuestions.filter(
            (question) => question.id !== singleQuestion.id
        );
        textAreaRefs.current = textAreaRefs.current.filter(
            (_, index) => quizQuestions[index].id !== singleQuestion.id
        );
        setQuizQuestions(updatedQuestions);
    }


    function handleInputChange(index, text) {
        const updetedQuestions = quizQuestions.map((question,i) => {
            if (index === i) {
                return {...question, mainQuestion: text};
            }

            return question;
        });

        setQuizQuestions(updetedQuestions);
    }

    function updateTheChoicesArray(text, choiceIndex, questionIndex) {
        const updatedQuestions = quizQuestions.map((question, i) => {
            if (questionIndex === i) {
                const updatedChoices = question.choices.map((choice, j) => {
                    if (choiceIndex === j) {
                        return  prefixes[j] + '. ' + text;
                    } else {
                        return choice;
                    }
                });

                return {...question, choices: updatedChoices};
            }

            return question;
        });

        setQuizQuestions(updatedQuestions);
    }

    function updateCorrectAnswer(text, questionIndex) {
        const correctAnswersArray = ['A', 'B', 'C', 'D'];
        console.log(correctAnswersArray.indexOf(text));
        const questionsCopy = [...quizQuestions];
        questionsCopy[questionIndex].correctAnswer = text;
        setQuizQuestions(questionsCopy);
    }       

    useLayoutEffect(() => {
        if (endOfListRef.current) {
            console.log(endOfListRef);
            setTimeout(() => {
                endOfListRef.current.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [quizQuestions.length]);

    useEffect(() => {
        // Focus the last textarea if it exists
        const lastTextAreaIndex = quizQuestions.length - 1;
        if (lastTextAreaIndex >= 0) {
            const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
            if (lastTextArea && focus) {
                lastTextArea.focus();
            }
        }
    }, [quizQuestions.length]);

    return (
        <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md">
            <Toaster 
                toastOptions={{
                    style: {
                        fontSize: "13px",
                    },
                }}
            />
            <div className="flex flex-col gap-2 w-full">
                {/* Header Area */}
                <div className="flex gap-2 items-center">
                    <div className="bg-green-700 px-4 py-2 rounded-md text-white">2</div>
                    <span className="font-bold">Quiz Question : </span>
                </div>
                {/* Question Area */}
                {quizQuestions.map((singleQuestion, questionIndex) => (
                    <div
                        ref={
                            quizQuestions.length -1 === questionIndex ? endOfListRef : null
                        }
                        key={questionIndex}
                        className="border ml-5 p-4 mt-4 border-green-700 
                            border-opacity-50 rounded-md flex justify-center relative"
                    >
                        <SingleQuestion 
                            questionInex={questionIndex} 
                            value={singleQuestion.mainQuestion}
                            ref={textAreaRefs.current[questionIndex]}
                            onChange = {(e) => {
                                handleInputChange(questionIndex, e.target.value);
                            }}
                            singleQuestion={singleQuestion}
                            quizQuestions = {quizQuestions}
                            setQuizQuestions={setQuizQuestions}
                        />
                        <Choices 
                            questionInex={questionIndex}
                            singleQuestion={singleQuestion}
                            quizQuestions={quizQuestions}
                            setQuizQuestions={setQuizQuestions}
                            onChangeChoice={(text, choiceIndex,questionIndex) => {
                                updateTheChoicesArray(text, choiceIndex, questionIndex);
                            }}
                            value={singleQuestion.choices}
                            prefixes={prefixes}
                        />
                        {questionIndex !== 0 && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                width={10}
                                height={10}
                                className="absolute top-2 right-3 text-red-600 cursor-pointer"
                                onClick={() => {
                                    deleteQuestion(singleQuestion);
                                }}
                            />
                        )}

                        <CorrectAnswer 
                            onChangeCorrectAnswer={(text) => {
                                updateCorrectAnswer(text, questionIndex);
                            }}
                            singleQuestion={singleQuestion}
                        />
                    </div>
                ))}

                {/* Button Area */}
                <div className="flex justify-center mt-3 w-full">
                    <button
                        onClick={() => {
                            addNewQuestion();
                        }}
                        className="bg-green-700 text-white p-3 rounded-md text-white w-[210px] text-[13px]"
                    >
                        Add a New Question
                    </button>
                </div>
            </div>
        </div>
    );
}
export default QuizBuildQuestions;

function CorrectAnswer({onChangeCorrectAnswer,singleQuestion}) {
    const [correctAnswerInput, setCorrectAnswerInput] = useState(
        singleQuestion.correctAnswer,
    );
    const prefixes = ['A', 'B', 'C', 'D'];
    function handleOnChangeInput(text) {
        const upperText = text.toUpperCase();
        for (const choice of singleQuestion.choices) {
            const eachChoice = choice.substring(0,1);
            if (eachChoice === upperText || upperText === "") {
                console.log(upperText);
                console.log(eachChoice);
                setCorrectAnswerInput(upperText);
                onChangeCorrectAnswer(upperText);
            }
        }
    }

    console.log(singleQuestion);
    return (
        <div className="flex gap-2 items-center mt-3">
            <div className="text-[15px]">Correct Answer</div>
            <div className="border border-gray-200 rounded-md p-1 w-full">
                <input 
                    value={preconnect[correctAnswerInput]}
                    maxLength={1}
                    onChange={(e) => {
                        handleOnChangeInput(e.target.value);
                    }}
                    className="p-3 w-full text-[13px] outline-none"
                    placeholder="Add the correct answer"
                />
            </div>
        </div>
    );
}

