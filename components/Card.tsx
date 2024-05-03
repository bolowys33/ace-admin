import { LibraryBooks } from "@mui/icons-material";
import { FC } from "react";

interface CardProps {
    title: string;
    count: number;
    compare?: string;
}

const Card: FC<CardProps> = ({ title, count, compare }) => {
    return (
        <div className="flex gap-5 bg-[#182237] hover:bg-[#2e374a] p-5 rounded-lg cursor-pointer w-full">
            <LibraryBooks />
            <div className="space-y-2">
            <span className="text-sm">{title}</span>
            <h5 className="text-2xl font-medium">{count}</h5>
            <p className="text-xs">{compare}</p>
            </div>
        </div>
    ) 
};

export default Card;
