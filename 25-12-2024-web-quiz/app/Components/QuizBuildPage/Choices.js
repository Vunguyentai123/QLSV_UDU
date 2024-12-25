'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

function Choices({ 
    questionIndex, 
    singleQuestion, 
    quizQuestions, 
    setQuizQuestions,
    onChangeChoice, // callback
}) {
    // Đảm bảo choices có giá trị mặc định
    const { choices = [] } = singleQuestion || {};
    const alphabets = ['A.', 'B.', 'C.', 'D.'];
    const positions = ['First', 'Second', 'Third', 'Fourth'];

    function addANewChoice() {
        const quizQuestionsCopy = [...quizQuestions];
        if (!quizQuestionsCopy[questionIndex]) {
            console.error("Question at the given index does not exist.");
            return;
        }
    
        if (!quizQuestionsCopy[questionIndex].choices) {
            quizQuestionsCopy[questionIndex].choices = [];
        }
    
        const lastChoicePosition = quizQuestionsCopy[questionIndex].choices.length;
        for (let i = lastChoicePosition - 1; i >= 0; i--) {
            const eachInput = quizQuestionsCopy[questionIndex].choices[i].substring(2);
            if (eachInput.trim(' ').length === 0) {
                return toast.error(
                    `Please ensure that all previous choices are filled out!`,
                );
            }
        }

        if (lastChoicePosition < 4) {
            const newChoice = `${alphabets[lastChoicePosition]}. `;
            quizQuestionsCopy[questionIndex].choices.push(newChoice);
            setQuizQuestions(quizQuestionsCopy);
        } else {
            toast.error('You can only add up to 4 choices');
        }
    }

    function deleteChoiceFunction(choiceIndex) {
        const quizQuestionsCopy = [...quizQuestions];
        const currentQuestion = quizQuestionsCopy[questionIndex];

        if (!currentQuestion || !currentQuestion.choices) {
            console.error("Cannot delete choice: Question or choices do not exist.");
            return;
        }

        currentQuestion.choices.splice(choiceIndex, 1);
        setQuizQuestions(quizQuestionsCopy);
    }

    function handleChoiceChangeInput(text, choiceIndex) {
        const quizQuestionsCopy = [...quizQuestions];
        const currentQuestion = quizQuestionsCopy[questionIndex];

        if (currentQuestion && currentQuestion.choices) {
            currentQuestion.choices[choiceIndex] = `${alphabets[choiceIndex]} ${text}`;
            setQuizQuestions(quizQuestionsCopy);
        } 
    }

    return (
        <div className="flex gap-[39px] items-center mt-3">
            <div className="text-[15px]">Choices</div>
            <div className="border border-gray-200 rounded-md p-4 w-full">
                {choices.map((singleChoice, choiceIndex) => (
                    <div 
                        key={choiceIndex} 
                        className="flex gap-2 items-center mt-3 relative" 
                    >
                        <span>{alphabets[choiceIndex]}</span>
                        <input 
                            type="text"
                            value={singleChoice.substring(alphabets[choiceIndex]?.length || 0)} // Cắt bỏ tiền tố A., B.,...
                            onChange={(e) => {
                                handleChoiceChangeInput(
                                    e.target.value,
                                    choiceIndex
                                );
                            }}
                            className="border border-gray-200 rounded-md p-2 w-full text-[13px] outline-none pr-10"
                            placeholder={`Add Your ${positions[choiceIndex]} Choice`}
                        />
                        {choiceIndex >= 2 && (
                            <FontAwesomeIcon 
                                icon={faXmark}
                                width={10}
                                height={10}
                                className="absolute top-2 right-3 text-red-600 cursor-pointer"
                                onClick={() => {
                                    deleteChoiceFunction(choiceIndex);
                                }}
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-center mt-3 w-full">
                    <button 
                        onClick={addANewChoice}
                        className="bg-green-700 text-white p-3 rounded-md text-[13px] w-[210px]"
                    >
                        Add a New Choice
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Choices;
