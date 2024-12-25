'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import useGlobalContextProvider from '@/app/ContextApi';
import { useRouter } from 'next/navigation';

function DropDown(props) {
    const { 
        dropDownToggleObject,
        threeDotsPositionsObject,
        selectedQuizObject,
        allQuizzes,
        setAllQuizes,
    } = useGlobalContextProvider();
    const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
    const { threeDotsPositions } = threeDotsPositionsObject;
    const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const dropDownRef = useRef(null);
    const router = useRouter();

    const menuItems = [
        { name: 'Modify', icon: faPencil },
        { name: 'Delete', icon: faTrash },
    ];

    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                if (!isDialogOpened) {
                    setSelectedQuiz(null);
                }
                setDropDownToggle(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropDownToggle]);

    async function deleteTheQuiz() {
        if (!selectedQuiz) return;

        const confirmDelete = confirm(`Do you really want to delete the quiz: ${selectedQuiz.quizTitle}?`);
        if (!confirmDelete) return;

        const res = await fetch(`http://localhost:3000/api/quizzes?id=${selectedQuiz._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            toast.error('Quiz deletion failed');
            return;
        }

        toast.success('Quiz deleted successfully');
        setSelectedQuiz(null);
        setDropDownToggle(false);
    }

    function handleClickedItem(menuItem) {
        if (menuItem.name === 'Modify') {
            router.push('quiz-build');
        }

        if (menuItem.name === 'Delete') {
            setIsDialogOpened(true);
            deleteTheQuiz();
        }

        setDropDownToggle(false);
    }

    return (
        <div
            style={{ top: threeDotsPositions.y, left: threeDotsPositions.x }}
            ref={dropDownRef}
            className={`p-4 w-32 fixed z-50 shadow-md bg-white rounded-lg flex flex-col gap-3
                poppins poppins-light text-[13px] ${dropDownToggle ? 'visible' : 'invisible'}`}
        >
            {menuItems.map((menuItem, index) => (
                <div
                    onClick={() => handleClickedItem(menuItem)}
                    key={index}
                    className="flex gap-2 items-center cursor-pointer border text-green-700 border-green-200 rounded-md 
                        select-none hover:bg-green-700 hover:text-white p-3"
                >
                    <FontAwesomeIcon className='size-4' icon={menuItem.icon} />
                    <div className=''>{menuItem.name}</div>
                </div>
            ))}
        </div>
    );
}

export default DropDown;