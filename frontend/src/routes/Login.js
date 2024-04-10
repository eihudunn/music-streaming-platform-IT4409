import { Icon } from '@iconify-icon/react'
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import { Link } from 'react-router-dom';

const LoginComponent = () => {
    return (
    <div className = "w-screen h-screen flex flex-col items-center">
        <div className="logoRegion p-7 bg-black flex w-full" >
            <Icon icon="logos:spotify" width='117'/>
        </div>
        <div className='loginRegion w-full h-full items-start justify-center flex background-gradient-to-b p-8'>
            <div className='inputRegion py-10 w-2/5 flex flex-col bg-black rounded-md'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='font-bold text-white text-4xl py-5 tracking-tighter'> Log in to Spotify </div>
                    <hr className='my-8 mx-14 w-2/3 border-hr'></hr>
                    <TextInput
                        label = "Email or username" 
                        placeholder="Email or username"
                        className=" text-white text-xs mb-10 px-48"
                    />
                    <PasswordInput
                        label = "Password"
                        placeholder="Password"
                        className='text-white text-xs px-48'
                    />
                    <div className='w-full flex items-center justify-center mb-4'>
                        <button className='w-full loginButton bg-signature-color font-semibold p-3 px-10 mx-48 rounded-full text-xs'>
                            Log In
                        </button>
                    </div>
                    <div className='font-semibold text-xs text-white underline'>Forgot your password?</div>
                    <hr className='my-8 mx-14 w-2/3 border-hr'></hr>
                    <div className='my-6 flex flex-row '>
                        <div className='font-semibold text-xs text-gray-400'>Don't have an account?</div>
                        <div className='text-white font-semibold text-xs ml-2 underline' >
                            <Link to='/signup'>Sign up for Spotify</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default LoginComponent;
