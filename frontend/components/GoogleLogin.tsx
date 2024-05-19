import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="text-sm relative px-8 text-white my-2 mx-10 w-2/5 flex items-center justify-center border border-solid rounded-full p-3 border-[#878787]"
    >
      <FcGoogle size={"20px"} className="relative" />
      <p className="font-semibold m-auto">Continue with Google</p>
    </button>
  );
};

export default GoogleLogin;
