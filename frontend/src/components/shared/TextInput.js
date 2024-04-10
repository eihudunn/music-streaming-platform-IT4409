const TextInput = ({label, placeholder, className}) => {
    return (
        <div className={`textInput flex flex-col space-y-2 w-full ${className}`}>
            <label for={label} className="font-semibold">
                {label}
            </label>
            <input 
                type="text" placeholder={placeholder} 
                className="p-2 border rounded border-gray-400 border-solid bg-inherit placeholder-gray-500"
                id = {label}
            />
        </div>
    );
};

export default TextInput;