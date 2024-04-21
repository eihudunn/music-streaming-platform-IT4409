import { Icon } from '@iconify/react';
import TextInput from '@/components/TextInput'; 
import PasswordInput from '@/components/PasswordInput';
import Link from 'next/link';
import GoogleLogin from '@/components/GoogleLogin';
import FacebookLogin from '@/components/FacebookLogin';
import PhoneLogin from '@/components/PhoneLogin';
import Head from 'next/head';

const LoginComponent = () => {
    return (
    <>
        <Head>
                <title>Login - Spotify</title>
        </Head>
        <div className = "w-screen h-screen flex flex-col items-center">
            <div className="logoRegion p-7 bg-black flex w-full" >
                <Link href="/"><Icon icon="logos:spotify" width='117'/></Link>
            </div>
            <div className='loginRegion w-full h-full items-start justify-center flex p-8'>
                <div className='inputRegion py-10 md:w-[734px] w-full flex flex-col bg-black rounded-md'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='font-bold text-white text-4xl tracking-tighter my-12'> Log in to Spotify </div>
                        <div className='w-full items-center justify-center flex flex-col'>
                            <GoogleLogin />
                            <FacebookLogin/>
                            <PhoneLogin />
                        </div>
                        <hr className='my-8 mx-14 w-full md:w-2/5 border-solid border-[#292929]'/>
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
                            <button className='w-full loginButton font-semibold p-3 px-10 mx-48 rounded-full text-xs text-black'>
                                Log In
                            </button>
                        </div>
                        <div className='font-semibold text-xs text-white underline'>Forgot your password?</div>
                        <hr className='my-8 mx-14 w-full md:w-2/5 border-solid border-[#292929]'/>
                        <div className='my-6 flex flex-row '>
                            <div className='font-semibold text-xs text-gray-400'>Don&apos;t have an account?</div>
                            <div className='text-white font-semibold text-xs ml-2 underline' >
                                <Link href='/signup'>Sign up for Spotify</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default LoginComponent;
