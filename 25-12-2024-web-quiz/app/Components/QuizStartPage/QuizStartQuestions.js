'use client';

import React, { useEffect, useState} from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import ScoreComponent from '../ScoreComponent';
import convertFromFaToText from '../../convertFromFaToText';

function QuizStartQuestions({onUpdateTime = () => {}, quizStartParentProps}) {
    const time = 30;
    const {quizToStartObject,allQuizzes,setAllQuizzes} = 
        useGlobalContextProvider();
    const {selectQuizToStart} = quizToStartObject;
    const {quizQuestions} = selectQuizToStart;
    const {user,setUser} = useGlobalContextProvider();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice,setSelectedChoice] = useState(null);
    const [indexOfQuizSelected,setIndexOfQuizSelected] = useState(null);
    const [isQuizEnded,setIsQuizEnded] = useState(false);
    const [score,setScore] = useState(0);

    const [timer,setTimer] = useState(time);
    let interval;

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval);
        };
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (timer === 0 && !isQuizEnded) {
            // updating the allquizzes
            const currentQuizzes = [...allQuizzes];
            currentQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.totalAttempts += 1;
            currentQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.incorectAttempts += 1;

            setAllQuizzes(currentQuizzes);
            //----------------------------
            if (currentQuestionIndex !== quizQuestions.length - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((current) =>  {
                        return current + 1;
                    });
                }, 1000);
            } else {
                setIsQuizEnded(true);
            }
        }
    }, [timer, isQuizEnded, currentQuestionIndex]);

    function startTimer() {
        clearInterval(interval);
        setTimer(time);
    
        interval = setInterval(() => {
            setTimer((currentTime) => {
                onUpdateTime(currentTime); // this is the parent function             
                if (currentTime === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return currentTime - 1;
            });
        }, 1000);
    }    

    async function saveDataIntoDB() {
        try{
            const id = selectQuizToStart._id;
            //
            const res = await fetch(
                `http://localhost:3000/api/quizzes?id=${id}`,
                {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        updateQuizQuestions: allQuizzes[indexOfQuizSelected].quizQuestions,
                    }),
                }
            );
            console.log(allQuizzes[indexOfQuizSelected].quizQuestions);
            if(!res.ok){
                toast.error('Something went wrong');
                return;
            }
        }catch(error){
            console.log(error);
        }
    }

    console.log(indexOfQuizSelected);
    
    // With the useEffect every time the component is loaded up
    // We need to get the index of the quiz we selected inside
    // the allQuizzes array to be able to navigate to the next quiz
    //
    useEffect(() => {
        const quizIndexFound = allQuizzes.findIndex(
            (quiz) => quiz._id === selectQuizToStart._id,
        );
        setIndexOfQuizSelected(quizIndexFound);
    }, []);

    useEffect(() => {
        if (isQuizEnded){
            // renitialize all answers to -1
            quizQuestions.forEach((quizQuestion) => {
                quizQuestion.answeredResult = -1;
            });
            saveDataIntoDB();
        }
    }, [isQuizEnded]);

    function selectChoiceFunction(choiceIndexClicked){
        // update the selectedChoice state
        setSelectedChoice(choiceIndexClicked);
        //------------------------------------

        // we update the answerResult property in the allQuizzes array
        const currentAllQuizzes = [...allQuizzes];

        currentAllQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].answeredResult = choiceIndexClicked;

        setAllQuizzes(currentAllQuizzes);
        //---------------------------------------
    }

    function moveToTheNextQuestion(){
        // check if the we did select the an answer by using the answerResult property if
        // it is -1 then we did not select any answer
        if (
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .answeredResult === -1
        ) {
            toast.error('Please select an answer');
            <ScoreComponent />;
            return;
        }

        // update the statistics of the quiz
        //===================================
        //update the totalAttempts
        allQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].statistics.totalAttempts += 1;

        // if the answer is incorrect
        if (
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .answeredResult !==
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .correctAnswer
        ) {
            // update the incorectAttempts
            allQuizzes[indexOfQuizSelected].quizQuestions[
                currentQuestionIndex
            ].statistics.incorectAttempts += 1;
            toast.error('Wrong Answer');
            
            //
            //
            if (currentQuestionIndex != quizQuestions.length -1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((current) => current + 1);
                    //
                    setSelectedChoice(null);
                },1200);
            } else {
                //
                //
                setTimer(0);
                clearInterval(interval);
                setIsQuizEnded(true);
            }

            return;
        }

        // update the correctAttempts
        allQuizzes[indexOfQuizSelected].quizQuestions[
            currentQuestionIndex
        ].statistics.correctAttempts += 1;
        // Increment the score by 1
        setScore((prevState) => prevState + 1);

        toast.success('Awesome!');
        addExperience();
        
        //this will stop the timer and end the quiz when currentQuestionIndex is the last
        // and only if we select the correct otherwise the timer is still running
        if (
            currentQuestionIndex === quizQuestions.length - 1 &&
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .answeredResult ===
            allQuizzes[indexOfQuizSelected].quizQuestions[currentQuestionIndex]
                .correctAnswer
        ) {
            setTimer(0);
            clearInterval(interval);
            setIsQuizEnded(true);
            return;
        }

        // increment the currentQuestionIndex by 1 to go to th next question
        setTimeout(() => {
            setCurrentQuestionIndex((current) => current + 1);
            // initialize the choice after going to the next question
            setSelectedChoice(null);
        }, 2000);
    }

    async function addExperience() {
        const userCopy = {...user};
        console.log (userCopy);
        if (userCopy && userCopy.experience !== undefined) {
            userCopy.experience += 1;
            setUser(userCopy);
        } 
        
        try{
            const response = await fetch(
                `http://localhost:3000/api/user?id=${userCopy._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ updateUser: userCopy }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                toast.error('Server error');
                throw new Error('Server error');
            }
            toast.success('Experience added');
            setUser(userCopy);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className='relative poppins rounded-sm m-9 w-9/12'>
            <Toaster
                toastOptions={{
                    //
                    className:'',
                    duration:1500,
                    style:{
                        padding:'12px'
                    },
                }}
            />
            {/* The Question Part */}
            <div className='flex items-center gap-2'>
                <div className='bg-green-700 flex justify-center items-center rounded-md w-11 h-11 text-white p-3'>
                    {currentQuestionIndex + 1}
                </div>
                <p>{quizQuestions[currentQuestionIndex].mainQuestion}</p>
            </div>
            {/* The Answer Part */}
            <div className='mt-7 flex flex-col gap-2'>
                {quizQuestions[currentQuestionIndex].choices.map(
                    (choice, indexChoice) => (
                        <div
                            key={indexChoice}
                            onClick={() => {
                                selectChoiceFunction(indexChoice);
                            }}
                            className={`p-3 ml-11 w-10/12 border border-green-700 rounded-md 
                                hover:bg-green-700 hover:text-white transition-all select-none ${
                                    selectedChoice === indexChoice
                                        ?'bg-green-700 text-white'
                                        :'bg-white'
                                }`}
                        >
                            {choice}
                        </div>
                    ),
                )}
            </div>
            {/* Submit Button */}
            <div className='flex justify-end mt-7'>
                <button
                    onClick={() => {
                        moveToTheNextQuestion();
                    }}
                    disabled={isQuizEnded ? true : false}
                    className={`p-2 px-5 text-[15px] text-white rounded-md bg-green-700 mr-[70px] ${
                        isQuizEnded ? 'opacity-60' : 'opacity-100'
                    }`}
                >
                    Submit
                </button>
            </div>
            
            {isQuizEnded && (
                <ScoreComponent
                    quizStartParentProps={{
                        setIsQuizEnded,
                        setIndexOfQuizSelected,
                        setCurrentQuestionIndex,
                        setSelectedChoice,
                        score,
                        setScore,
                    }}
                />
            )}
        </div>
    );
}

export default QuizStartQuestions;

