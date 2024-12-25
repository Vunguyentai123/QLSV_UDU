import User from '../../../app/models/UserSchema.js';
import { connectToDB } from '../../../libs/mongoDB.js';
import { NextResponse } from 'next/server.js';

export async function POST(request) {
    await connectToDB();
    const { name, isLogged, experience } = await request.json();

    if (!name || typeof isLogged !== 'boolean' || typeof experience !== 'number') {
        return NextResponse.json({ message: 'Invalid user data' }, { status: 400 });
    }

    try {
        const countUsers = await User.countDocuments();
        if (countUsers > 0) {
            const findUser  = await User.findOne();
            return NextResponse.json({
                user: findUser ,
                message: 'User  already exists',
            });
        }

        const newUser  = await User.create({ name, isLogged, experience });
        return NextResponse.json({ user: newUser  });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    await connectToDB();
    const id = request.nextUrl.searchParams.get('id');

    try {
        let userUpdate = await User.findById(id);
        const { updateUser  } = await request.json();

        userUpdate.isLogged = updateUser .isLogged;
        userUpdate.experience = updateUser .experience;

        await userUpdate.save();
        return NextResponse.json({ message: 'User  updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}