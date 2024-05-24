import { FaFacebook } from "react-icons/fa";

const FacebookLogin = () => {
    return (
        <button className="text-sm relative px-8 text-white my-2 mx-10 w-2/5 flex items-center justify-center border border-solid rounded-full p-3 border-[#878787]">
            <FaFacebook size={"20px"} className="relative" color="blue"/> 
            <p className="font-semibold m-auto">Continue with Facebook</p>
        </button>
    )
}

export default FacebookLogin;