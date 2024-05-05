interface InputProps {
    placeholder: string;
    name: string;
    label: string;
    required: boolean;
}

const InputField = ({ placeholder, name, label, required }: InputProps) => {
    return (
        <div className="text-start">
            <label htmlFor={name}>{label}</label>
            <div className=" bg-[#2e374a] rounded-lg p-2">
                <input
                    type="text"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    required={required}
                    className="bg-transparent border-none outline-none pl-2 w-max"
                />
            </div>
        </div>
    );
};

export default InputField;
