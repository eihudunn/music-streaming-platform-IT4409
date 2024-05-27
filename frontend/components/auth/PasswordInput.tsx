"use client";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div
      className={`textInput flex flex-col space-y-2 mb-12 w-full ${className}`}
    >
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="p-2 border rounded border-gray-400 border-solid  bg-inherit placeholder-gray-500"
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordInput;
