import {useNavigate} from "react-router";
import styles from './index.module.scss';

export const SearchForm = () => {
    const navigate = useNavigate();

    return (
        <form className={styles.searchForm} onSubmit={(e) => {
            e.preventDefault();
            const searchValue = e.currentTarget.search.value;
            navigate(`/search?search=${encodeURIComponent(searchValue)}`);
        }}>
            <input
                type="search"
                name="search"
                className={styles.searchInput}
                placeholder="поиск"
            />
            <input
                type="submit"
                value=""
                className={styles.submitInput}
            />
        </form>
    )
}