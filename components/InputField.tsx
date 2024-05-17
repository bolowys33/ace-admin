import { Visibility } from "@mui/icons-material";
import { ChangeEventHandler } from "react";

interface InputProps {
    placeholder?: string;
    name: string;
    value?: string;
    label: string;
    required?: boolean;
    type: string;
    show?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({
    placeholder,
    name,
    label,
    required,
    type,
    show,
    value,
    onChange,
}: InputProps) => {
    return (
        <div className="text-start space-y-3 w-full">
            <label htmlFor={name} className="ml-3">
                {label}
            </label>
            <div className="flex gap-3 bg-[#2e374a] rounded-lg p-2">
                <input
                    type={type}
                    name={name}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    className="bg-transparent border-none outline-none pl-2 w-full"
                />
                {show && <Visibility />}
            </div>
        </div>
    );
};

export default InputField;
