import { ChangeEventHandler } from "react";

interface InputProps {
    placeholder?: string;
    name: string;
    label: string;
    required: boolean;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}

const InputField = ({ placeholder, name, label, required, type, onChange }: InputProps) => {
    return (
        <div className="text-start space-y-3 w-full">
            <label htmlFor={name} className="ml-3">
                {label}
            </label>
            <div className=" bg-[#2e374a] rounded-lg p-2">
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    className="bg-transparent border-none outline-none pl-2 w-full"
                />
            </div>
        </div>
    );
};

export default InputField;
