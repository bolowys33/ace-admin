import { SearchRounded } from "@mui/icons-material";

const Search = ({placeholder}: {placeholder: string}) => {
    return ( <div>
        <SearchRounded />
        <input type="text" title="search" placeholder={placeholder} className="bg-transparent border-none outline-none pl-2" />
    </div> );
}
 
export default Search;