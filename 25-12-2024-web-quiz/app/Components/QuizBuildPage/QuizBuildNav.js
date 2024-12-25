'use client';
import React,{useEffect,useState} from "react";
import Image from "next/image";
import useGlobalContextProvider from "@/app/ContextApi";
import {v4 as uuidv4} from "uuid";
import {faCode} from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";
import convertFromFaToText from "../../convertFromFaToText";

function validateQuizQuestions(quizQuestions) {
    for (let question of quizQuestions) {
        // check if the main question is empty
        if (!question.mainQuestion.trim()) {
            return {valid: false, message: "Please fill in the main questions"};
        }

        // check if the choices are empty
        if (question.choices.some((choice) => !choice.trim().substring(2))) {
            return {valid: false, message: "Please fill in all the choices"};
        }

        // check if the correct answer is empty
        if (question.correctAnswer.length === 0) {
            return {valid: false, message: "Please specify the correct answer"};
        }
    }
    return {valid: true};
}

function QuizBuildNav({newQuiz, setNewQuiz}) {
    const {allQuizzes, setAllQuizzes,selectedQuizObject} = 
        useGlobalContextProvider();
    const {selectedQuiz, setSelectedQuiz} = selectedQuizObject;
    const [isLoading, setIsLoading] = useState(false);

    async function createNewQuiz() {
        try{
            setIsLoading(true);
            const textIcon = convertFromFaToText(newQuiz.icon);
            const newWithTextIcon = {
                ...newQuiz,
                icon: textIcon,
            };

            const res = await fetch('http://localhost:3000/api/quizzes',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizWithTextIcon),
            });

            if (!res.ok) {
                toast.error('Failed to create a new quiz');
                setIsLoading(false);
                return;
            }

            const {id} = await res.json();
            setNewQuiz((prevQuiz) => ({
                ...prevQuiz,
                _id : id,
            }));

            setAllQuizzes([...allQuizzes,newQuiz]);
            toast.success('Quiz created successfully');
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    }

    async function saveQuiz() {
        if (newQuiz.quizTitle.trim(' ').length === 0) {
            return toast.error(`Please add a name for the quiz`);
        }

        const isValid = validateQuizQuestions(newQuiz.quizQuestions);
        if (isValid.valid === false) {
            toast.error(isValid.message);
            return;
        }

        if(selectedQuiz){
            const updatedQuiz = [...allQuizzes];
            const findIndexQuiz = updatedQuiz.findIndex(
                (quiz) => quiz._id === selectedQuiz._id
            );

            if (findIndexQuiz !== -1) {
                updatedQuiz[findIndexQuiz] = newQuiz;
            }
            const id = updatedQuiz[findIndexQuiz]._id;
            //
            const convertIconText = convertFromFaToText(
                updatedQuiz[findIndexQuiz].icon,
            );
            console.log(updatedQuiz[findIndexQuiz]);
            updatedQuiz[findIndexQuiz].icon = convertIconText;
            try{
                const res = await fetch(`http://localhost:3000/api/quizzes?id=${id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        updatedQuiz: updatedQuiz[findIndexQuiz],
                    }),
                });

                if (!res.ok) {
                    throw new Error('Failed to update the quiz');
                }
                toast.success('Quiz updated successfully');
                setAllQuizzes(updatedQuiz);
            }catch(error){}
        }else{
            createNewQuiz();
            
            router.push('/');
        }
    }

    console.log(newQuiz)

    function addNewQuiz() {
        if (newQuiz.quizTitle.trim(' ').length === 0) {
            return toast.error(`Please add a name for the quiz`);   
        }

        const isValid = validateQuizQuestions(newQuiz.quizQuestions);
        if (isValid.valid === false) {
            toast.error(isValid.message);
            return;
        }

        //setAllQuizzes([...prevQuizzes, newQuiz]);
        //router.push('/');
    }

    console.log(allQuizzes);
    return (
        <div className="poppins my-12 flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <Image src="/quiz-builder-icon.png" alt='' height={50} width={50}/>
                <span className="text-2xl">
                    Quiz <span className="text-green-700 font-bold">Builder</span>
                </span>
            </div>
            <button 
                onClick={() => {
                    addNewQuiz();
                }}
                disabled={isLoading}
                className="bg-green-700 text-white px-4 py-2 rounded-md"
            >
                {isLoading ? 'Saving...' : 'Save Quiz'}
            </button>
        </div>
    )
}

export default QuizBuildNav;