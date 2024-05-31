import { signIn } from 'next-auth/react';
import { BsGithub } from 'react-icons/bs';

const GithubLogin = () => {
  return (
    <button
      onClick={() => signIn('github')}
      className="text-sm relative px-8 text-white my-2 mx-10 w-2/5 flex items-center justify-center border border-solid rounded-full p-3 border-[#878787]"
    >
      <BsGithub size={'20px'} className="relative" color="white" />
      <p className="font-semibold m-auto">Continue with Github</p>
    </button>
  );
};

export default GithubLogin;
