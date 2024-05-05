import { SearchRounded } from "@mui/icons-material";

const Search = ({ placeholder }: { placeholder: string }) => {
    return (
        <div className="flex items-center bg-[#2e374a] gap-2 w-[max-content] rounded-lg p-2 ">
            <SearchRounded />
            <input
                type="text"
                title="search"
                placeholder={placeholder}
                className="bg-transparent border-none outline-none pl-2"
            />
        </div>
    );
};

export default Search;
