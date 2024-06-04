'use client';

import { Icon } from '@iconify/react';
import TextInput from '@/components/auth/TextInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Link from 'next/link';
import GoogleLogin from '@/components/auth/GoogleLogin';
import FacebookLogin from '@/components/auth/FacebookLogin';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import GithubLogin from '@/components/auth/GIthubLogin';
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  console.log(session);
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  });
  const handleLogin = async () => {
    const { email, password } = data;

    // Check if all fields are filled
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    // If all checks pass, make the API call
    signIn('credentials', {
      redirect: false,
      ...data,
    })
      .then((callback) => {
        console.log(callback);
        if (callback?.error) {
          toast.error(callback?.error);
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in successfully');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  return (
    <>
      <Head>
        <title>Login - Hustify</title>
      </Head>
      <div className="w-screen h-screen flex flex-col items-center">
        <div className="logoRegion p-7 bg-black flex w-full">
          <Link href="/">
            <Icon icon="logos:spotify" width="117" />
          </Link>
        </div>
        <div className="loginRegion w-full h-full items-start justify-center flex p-8">
          <div className="inputRegion py-10 md:w-[734px] w-full flex flex-col bg-black rounded-md">
            <div className="flex flex-col items-center justify-center">
              <div className="font-bold text-white text-4xl tracking-tighter my-12">
                {' '}
                Log in to Hustify{' '}
              </div>
              <div className="w-full items-center justify-center flex flex-col">
                <GoogleLogin />
                <FacebookLogin />
                <GithubLogin />
              </div>
              <hr className="my-8 mx-14 w-full md:w-2/5 border-solid border-[#292929]" />
              <TextInput
                label="Email or username"
                placeholder="Email or username"
                className=" text-white text-xs mb-10 px-48"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                className="text-white text-xs px-48"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="w-full flex items-center justify-center mb-4">
                <button
                  onClick={handleLogin}
                  className="w-full loginButton font-semibold p-3 px-10 mx-48 rounded-full text-xs text-black"
                >
                  Log In
                </button>
              </div>
              <div className="font-semibold text-xs text-white underline">
                Forgot your password?
              </div>
              <hr className="my-8 mx-14 w-full md:w-2/5 border-solid border-[#292929]" />
              <div className="my-6 flex flex-row ">
                <div className="font-semibold text-xs text-gray-400">
                  Don&apos;t have an account?
                </div>
                <div className="text-white font-semibold text-xs ml-2 underline">
                  <Link href="/signup">Sign up for Spotify</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
