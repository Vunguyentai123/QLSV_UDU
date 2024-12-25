'use client';
import React from "react";
import QuizCard from "./QuizCard";
import PlaceHolder from "./PlaceHolder";
import useGlobalContextProvider from "../ContextApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropDown from "./DropDown";

function QuizzesArea({props}) {
    const { allQuizzes,userObject } = useGlobalContextProvider();
    const router = useRouter();
    const { user,setUser } = userObject;

    return (
        <div className="poppins mx-12 mt-10">
            <div>
                {user && user.isLogged ? (
                    <>
                        {allQuizzes.length === 0 ? (
                            <PlaceHolder />
                        ) : (
                            <div>
                                <DropDown />
                                <h2 className="text-xl font-bold">My Quizzes</h2>
                                <div className="mt-6 flex gap-2 flex-wrap">
                                    <div className="flex gap-2 flex-wrap">
                                        {allQuizzes.map((singleQuiz,quizIndex) => (
                                            <div key={quizIndex}>
                                                <QuizCard singleQuiz={singleQuiz} />
                                            </div>
                                        ))}
                                    </div>
                                    <div 
                                        onClick={() => router.push('/quiz-build')}
                                        className="cursor-pointer flex flex-col items-center justify-center gap-2 
                                        border-2 border-gray-100 rounded-[10px] bg-white p-4"
                                    >
                                        <Image 
                                            src={'/create.png'} 
                                            alt='' 
                                            width={100} 
                                            height={100}
                                        />
                                        <span className="select-none opacity-40">
                                            Add a new Quiz
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="h-96 flex flex-col gap-4 items-center justify-center">
                        <h2 className="text-5xl font-bold">
                            Learn 10x <span className="text-green-700">Faster!</span>
                        </h2>
                        <span className="text-xl font-light">
                            Unlock Your Potential with Quiz Time
                        </span>
                        <button
                            onClick={() => {
                                setUser((prevUser) => ({...prevUser,isLogged: true}));
                            }}
                            className="bg-green-700 text-white p-4 rounded-md"
                        >
                            Get Started Now!
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizzesArea;