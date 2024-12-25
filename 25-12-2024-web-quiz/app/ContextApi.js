'use client';

import { createContext, useContext, useState, useEffect} from 'react';
import { quizzesData} from './QuizzesData';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const GlobalContext = createContext();

export function ContextProvider({children}){
    const defaultUser = {
        id: 1,
        name: 'QuizUser',
        isLogged: false,
        experience: 0,
    };
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [selectQuizToStart, setSelectQuizToStart] = useState(null);
    const [user, setUser] = useState(() => {
        const saveUserData = localStorage.getItem('user');
        return saveUserData ? JSON.parse(saveUserData).defaultUser : defaultUser;
    });
    const [openIconBox, setOpenIconBox] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState({faIcon: faQuestion });

    const [dropDownToggle, setDropDownToggle] = useState(false);
    const [threeDotsPositions, setThreeDotsPositions] = useState({x: 0, y: 0});

    const [userXP, setUserXP] = useState(() => {
        const saveUserData = localStorage.getItem('user');
        return saveUserData ? JSON.parse(saveUserData).experience : 0;
    });

    useEffect(() => {
        try {
            if (user) {
                const userData = JSON.stringify(user);
                if (userData.length <= 5000) { // Giới hạn kích thước dữ liệu (5KB)
                    localStorage.setItem('user', userData);
                } else {
                    console.warn('User data exceeds storage quota');
                }
            }
        } catch (error) {
            console.error('Error saving user data to localStorage', error);
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saveUserData = localStorage.getItem('user');
            console.log('saveUserData', saveUserData);
            setUser({
                ...saveUserData,
                isLogged: true,
            });
            setUserXP(saveUserData.experience);
        }else{
            setUser(defaultUser);
            setUserXP(defaultUser.experience);
        }
    },[]);

    useEffect(() =>{
        const fetchUser = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/user',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: 'QuizUser',
                        isLogged: false,
                        experience: 0,
                    }),
                });

                

                const userData = await response.json();
                console.log(userData);

                if (userData.mesaage === 'User already exists') {
                    //
                    setUser(userData.user);
                }else{
                    //
                    setUser(userData.user);
                }
            }catch(error){
                console.log(error);
            }
        };
        fetchUser();
    },[]);

    useEffect(() => {
        const fetchAllQuizzes = async () => {
            try{
                const response = await fetch('http://localhost:3000/api/quizzes',{
                    cache : 'no-cache',
                });   

                

                const quizzesData = await response.json();

                setAllQuizzes(quizzesData.quizzes);
            }catch(error){
                console.log(error);
            }
        };

        fetchAllQuizzes();
    },[]);

    console.log(allQuizzes)

    useEffect(() => {
        setAllQuizzes(quizzesData);
    },[]);

    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            experience: userXP,
        }));
    },[userXP]);

    useEffect(() => {
        if (selectedQuiz) {
            setSelectedIcon({faIcon: selectedQuiz.icon});
        }else{
            setSelectedIcon({faIcon: faQuestion});
        }
    },[selectedQuiz]);

    return (
        <GlobalContext.Provider 
            value={{
                allQuizzes, 
                setAllQuizzes,
                quizToStartObject: {selectQuizToStart, setSelectQuizToStart},
                userObject: {user, setUser},
                openBoxToggle: {openIconBox, setOpenIconBox},
                selectedIconObject: {selectedIcon, setSelectedIcon},
                dropDownToggleObject: {dropDownToggle, setDropDownToggle},
                threeDotsPositionsObject: {threeDotsPositions, setThreeDotsPositions},
                selectedQuizObject: {selectedQuiz, setSelectedQuiz},
                userXPObject: {userXP, setUserXP},
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default function useGlobalContextProvider() {
    return useContext(GlobalContext);
}