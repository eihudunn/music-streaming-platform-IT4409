"use client";

interface TextInputProps {
  label: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div className={`textInput flex flex-col space-y-2 w-full ${className}`}>
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border rounded border-gray-400 border-solid bg-inherit placeholder-gray-500"
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
