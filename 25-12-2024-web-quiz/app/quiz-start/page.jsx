'use client';

import React, { useEffect } from 'react';
import useGlobalContextProvider from '@/app/ContextApi';
import QuizStartHeader from '../Components/QuizStartPage/QuizStartHeader';
import QuizStartQuestions from '../Components/QuizStartPage/QuizStartQuestions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Page(props) {
    const {allQuizzes,quizToStartObject} = useGlobalContextProvider();
    const {selectQuizToStart} = quizToStartObject;
    const router = useRouter();

    useEffect(() => {
        if (selectQuizToStart === null) {
            router.push('/');
        }
    }, []);
    return (
        <div className='poppins flex flex-col px-24 mt-[35px]'>
            {selectQuizToStart === null ? (
                <div className='h-svh flex flex-col gap-2 items-center justify-center'>
                    <Image src='/errorIcon.png' alt='' width={180} height={180} />
                    <h2 className='text-xl font-bold'>
                        Please Select Your Quiz To Start
                    </h2>
                    <span className='font-light'>
                        You will be redirected to the home page 
                    </span>
                </div>
            ) : (
                <>
                    <QuizStartHeader />
                    <div className='mt-10 flex items-center justify-center'>
                        <QuizStartQuestions />
                    </div>
                </>
            )}
        </div>
    )
}

export default Page;