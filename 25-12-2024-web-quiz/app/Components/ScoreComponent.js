'use client';   
import React from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import Image from 'next/image';

function ScoreComponent({quizStartParentProps}) {
    const {quizToStartObject,allQuizzes} = useGlobalContextProvider();
    const {selectQuizToStart} = quizToStartObject;
    const numberOfQuestions = selectQuizToStart.quizQuestions.length;
    //
    const {
        setIsQuizEnded,
        setIndexOfQuizSelected,
        setCurrentQuestionIndex,
        setSelectedChoice,
        setScore,
        score,
    } = quizStartParentProps;

    function emojiIconScore() {
        const emojiFaces = [
            'confused-emoji.png',
            'happy-emoji.png',
            'very-happy-emoji.png',
        ];
        const result = (score / selectQuizToStart.quizQuestions.length) * 100;

        if (result < 50) {
            return emojiFaces[0];
        }

        if (result == 50) {
            return emojiFaces[1];
        }

        return emojiFaces[2];
    }

    console.log(emojiIconScore());

    function tryAgainFunction() {
        setIsQuizEnded(false);
        const newQuizIndex = allQuizzes.findIndex(
            (quiz) => quiz.id === selectQuizToStart.id,
        );
        setIndexOfQuizSelected(newQuizIndex);
        setCurrentQuestionIndex(0);
        setSelectedChoice(null);
        setScore(0);
        startTimer();
        console.log(selectQuizToStart);
    }

    return (
        <div className='flex items-center justify-center rounded-md top-[-100px] border border-gray-300'>
            {/* The Score Area */}
            <div className='flex gap-4 items-center justify-center flex-col'>
                <Image src={`/${emojiIconScore()}`} alt='Emoji Icon' width={100} height={100} />
                <div className='flex gap-1 flex-col'>
                    <span className='font-bold text-2xl'>Your Score</span>
                    <div className='text-[22px] text-center'>
                        {score}/{numberOfQuestions}
                    </div>
                </div>
                <button
                    onClick={() => tryAgainFunction()}
                    className='p-2 text-white bg-green-700 rounded-md px-6'
                >
                    Try Again
                </button>
                {/*Statistics*/}
                <div className='flex gap-2 w-full flex-col mt-3'>
                    <div className='flex gap-1 items-center justify-center'>
                        <Image src='/correct-answer.png' alt='' width={20} height={20} />
                        <span className='text-[14px]'> Correct Answer: {score}</span>
                    </div>
                    <div className='flex gap-1 items-center justify-center'>
                        <Image src='/incorrect-answer.png' alt='' width={20} height={20} />
                        <span className='text-[14px]'> 
                            Incorrect Answer: 
                            {selectQuizToStart.quizQuestions.length - score}
                        </span>
                    </div>
                </div>
                <button>
                    <a href='/'>Go Back</a>
                </button>
            </div>
        </div>
    );
}

export default ScoreComponent;