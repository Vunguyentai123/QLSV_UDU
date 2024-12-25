'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { iconsData } from '@/app/iconsData';
import useGlobalContextProvider from '@/app/ContextApi';

function IconsComponents() {
    const [allIcons, setAllIcons] = useState(iconsData);
    const { openBoxToggle, selectedIconObject } = useGlobalContextProvider();
    const { openIconBox, setOpenIconBox } = openBoxToggle;
    const { setSelectedIcon } = selectedIconObject;

    function handleClickedIcon(iconIndex) {
        const updatedIcons = allIcons.map((icon, i) => {
            if (i === iconIndex) {
                setSelectedIcon((prevState) => {
                    const copyIconState = { ...prevState };
                    copyIconState.faIcon = icon.faIcon;
                    return copyIconState;
                });
                return { ...icon, isSelected: true };
            }
            return { ...icon, isSelected: false };
        });
        setAllIcons(updatedIcons);
    }

    return (
        <div
            className={`w-full flex absolute justify-center items-center top-50 ${openIconBox ? 'visible' : 'invisible'}`}
        >
            <div 
                className='relative z-50 w-[570px] p-4 rounded-md bg-white
                border border-green-700 flex flex-col gap-6 shadow-md'
            >
                <FontAwesomeIcon 
                    height={20}
                    width={20}
                    className='absolute top-8 right-4 cursor-pointer text-gray-300'
                    icon={faClose}
                    onClick={() => setOpenIconBox(false)}
                />
                <h2 className='text-lg font-bold'>Choose an Icon</h2>
                <div className='grid grid-cols-4 gap-4'>
                    {allIcons.map((icon, index) => (
                        <div
                            key={index}
                            className={`flex justify-center items-center cursor-pointer p-2 border rounded-md 
                            ${icon.isSelected ? 'border-green-700' : 'border-gray-300'}`}
                            onClick={() => handleClickedIcon(index)}
                        >
                            <FontAwesomeIcon icon={icon.faIcon} size="2x" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IconsComponents;