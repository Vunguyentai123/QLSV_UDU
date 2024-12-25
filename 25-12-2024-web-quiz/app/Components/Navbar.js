import useGlobalContextProvider from '../ContextApi';
import toast from 'react-hot-toast';
import Image from 'next/image';

function Navbar(props) {
    const { userObject, userXP } = useGlobalContextProvider();
    const { user, setUser  } = userObject || {};

    async function changeTheLoginState() {
        const userCopy = { ...user };
        userCopy.isLogged = !userCopy.isLogged;
        setUser (userCopy);
        try {
            const response = await fetch(
                `http://localhost:3000/api/user?id=${userCopy._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ updateUser : userCopy }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Failed to update user: ${errorData.message}`);
                throw new Error(`Failed to update user: ${errorData.message}`);
            }
            toast.success('User  updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        }
    }

    return (
        <nav className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10">
            <div className='sm:flex sm:items-center sm:justify-between'>
                <div className='text-center sm:text-left'>
                    <a className='flex gap-1 items-center'>
                        <Image
                            src="/quizSpark_icon.png"
                            alt='Quiz Spark Logo'
                            width={60}
                            height={60}
                        />
                        <h2 className='text-2xl font-bold flex gap-2'>
                            Quiz <span className="text-green-700">Time</span>
                        </h2>
                    </a>
                </div>

                <div className='mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center'>
                    {user && user.isLogged && (
                        <div className='flex gap-2'>
                            <span>Welcome: {user.name}</span>
                            <span className='font-bold text-green-700'>
                                {userXP} XP
                            </span>
                        </div>
                    )}
                    <button
                        className='block rounded-lg bg-green-700 px-7 py-3 text-sm font-medium text-white hover:bg-green-600'
                        type='button'
                        onClick={changeTheLoginState}
                    >
                        {user && user.isLogged ? 'Logout' : 'Login'}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;