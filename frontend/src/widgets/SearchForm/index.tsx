import {useNavigate} from "react-router";
import './index.scss';
import './adaptive.scss';

export const SearchForm = () => {
    const navigate = useNavigate();

    return (
        <form className='search-form' onSubmit={(e) => {
            e.preventDefault();
            const searchValue = e.currentTarget.search.value;
            navigate(`/search?search=${encodeURIComponent(searchValue)}`);
        }}>
            <input
                type="search"
                name="search"
                className="search-input"
                placeholder="поиск"
            />
            <input
                type="submit"
                value=""
                className="submit-input"
            />
        </form>
    )
}