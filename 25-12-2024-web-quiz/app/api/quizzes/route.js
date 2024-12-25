import Quiz from '../../../app/models/QuizSchema';
import { connectToDB } from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectToDB();
    const { quizTitle, icon, quizQuestions } = await request.json();

    if (!quizTitle || !icon || !quizQuestions) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const newQuiz = await Quiz.create({ quizTitle, icon, quizQuestions });
        return NextResponse.json({
            id: newQuiz.id,
            message: 'Quiz created successfully',
        });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET() {
    await connectToDB();
    try {
        const quizzes = await Quiz.find();
        return NextResponse.json({ quizzes });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    await connectToDB();
    const id = request.nextUrl.searchParams.get('id');

    try {
        const quizToUpdate = await Quiz.findById(id);
        const { updateQuiz, updateQuizQuestions } = await request.json();

        if (updateQuiz) {
            quizToUpdate.quizTitle = updateQuiz.quizTitle;
            quizToUpdate.icon = updateQuiz.icon;
            quizToUpdate.quizQuestions = updateQuiz.quizQuestions;
        }

        if (updateQuizQuestions) {
            quizToUpdate.quizQuestions = updateQuizQuestions;
        }

        await quizToUpdate.save();
        return NextResponse.json({ message: 'Quiz updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await connectToDB();
    try {
        await Quiz.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}