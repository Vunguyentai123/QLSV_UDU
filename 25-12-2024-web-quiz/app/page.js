'use client';
import { useEffect,useState } from 'react';
import Navbar from './Components/Navbar';
import useGlobalContextProvider from './ContextApi';
import QuizzesArea from './Components/QuizzesArea';
import { useRouter } from 'next/navigation';
import QuizStartHeader from './Components/QuizStartPage/QuizStartHeader';
import QuizStartQuestions from './Components/QuizStartPage/QuizStartQuestions';

import {Toaster} from 'react-hot-toast';

export default function Home() {
    const {quizToStartObject} = useGlobalContextProvider();
    const {selectedQuiz, setSelectedQuiz} = quizToStartObject;
    const {selectQuizToStart,setSelectQuizToStart} = quizToStartObject;
    const [parentTimer, setParentTimer] = useState(100);
    const router = useRouter();

    useEffect(() => {        
        if (selectQuizToStart === null) {
            router.push('/');
        }
    }, [selectQuizToStart, router]);

    useEffect(() => {
        setSelectQuizToStart(null);
    }, []);

    function onUpdateTime(currentTime) {
        setParentTimer(currentTime);
    }
    
    return (
        <div>
            <Toaster/>
            <header>
                <Navbar/>
            </header>
            <QuizzesArea/>
        </div>
    );
}

