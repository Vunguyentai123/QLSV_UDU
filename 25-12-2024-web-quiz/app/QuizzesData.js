'use client';
import {faCode} from '@fortawesome/free-solid-svg-icons';

export const quizzesData = [
    {
        id: 1,
        icon: faCode,
        quizTitle: 'Javascript Quiz 1',
        quizQuestions: [
            {
                id: 1,
                mainQuestion: 'What is the purpose of JavaScript?',
                choices: [
                    'A: To style a webpage',
                    'B: To make a webpage interactive',
                    'C: To make a webpage look good',
                    'D: To make a webpage responsive'
                ],
                correctAnswer: 1,
                answeredResult: -1,
                statistics: {
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorectAttempts: 0,
                },
            },
            {
                id: 2,
                mainQuestion: 'What is the typeof operator in JavaScript?',
                choices: [
                    'A: string',
                    'B: number',
                    'C: boolean',
                    'D: underfined'
                ],
                correctAnswer: 1,
                //B
                answeredResult: -1,
                statistics: {
                    totalAttempts: 0,
                    correctAttempts: 1,
                    incorectAttempts: 1,
                },
            },
        ],
    },
];