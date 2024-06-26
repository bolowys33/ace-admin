import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ChangeEventHandler, useState } from "react";

interface InputProps {
    placeholder?: string;
    name: string;
    value?: string;
    label: string;
    required?: boolean;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({
    placeholder,
    name,
    label,
    required,
    type,
    value,
    onChange,
}: InputProps) => {
    const [visibility, setVisibility] = useState(false);

    const handleVisibility = () => {
        setVisibility((prevState) => !prevState);
    };

    return (
        <div className="text-start space-y-3 w-full">
            <label htmlFor={name} className="ml-3">
                {label}
            </label>
            <div className="flex items-center gap-3 bg-[#2e374a] rounded-lg p-2">
                <input
                    type={visibility ? "text" : type}
                    name={name}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    className="bg-transparent border-none outline-none pl-2 w-full"
                />
                {type === "password" && (
                    <div
                        className="cursor-pointer transition-all ease-in-out duration-300"
                        onClick={handleVisibility}>
                        {visibility ? <VisibilityOff /> : <Visibility />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;
