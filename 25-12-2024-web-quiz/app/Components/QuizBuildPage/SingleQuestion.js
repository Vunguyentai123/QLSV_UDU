'use client';
import React, { forwardRef } from 'react';
import Choices from './Choices';

const SingleQuestion = forwardRef(({ questionIndex, value, onChange }, ref) => {
    return (
        <div className="w-full p-4 border border-gray-300 rounded-md">
            <textarea
                ref={ref}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder={`Question ${questionIndex + 1}`}
            />
        </div>
    );
});

export default SingleQuestion;