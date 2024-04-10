const PasswordInput = ({label, placeholder, className}) => {
    return (
        <div className={`textInput flex flex-col space-y-2 mb-12 w-full ${className}`}>
            <label for={label} className="font-semibold">
                {label}
            </label>
            <input 
                type="password" placeholder={placeholder} 
                className="p-2 border rounded border-gray-400 border-solid  bg-inherit placeholder-gray-500"
                id = {label}
            />
        </div>
    );
};

export default PasswordInput;