import { useState, useEffect, useRef } from 'react';
import { useAddressSuggester } from '../hooks/useAddressSuggester';
import '../styles/SearchBarStyle.css';

function SearchBar() {
    const {
        addressSuggestions,
        isAddressSuggesterLoading,
        addressSuggesterError,
        fetchAddressSuggestions
      } = useAddressSuggester();

    const [search, setSearch] = useState("");
    const debounceTimer = useRef(null);

    useEffect(() => {
        if(debounceTimer.current){
            clearTimeout(debounceTimer.current);
        }

        if (search.trim().length > 2){
            debounceTimer.current = setTimeout(async () => {
                try {
                   await fetchAddressSuggestions(search.trim());
                }
                catch(err){
                    console.error(err);
                }
            }, (300));
        }

        return () => {
            if(debounceTimer.current){
                clearTimeout(debounceTimer.current);
            }
        };
    }, [search, fetchAddressSuggestions]);

     useEffect(() => {
        console.log(addressSuggestions);
    }, [addressSuggestions]);


    function handleChange(event){
        setSearch(event.currentTarget.value);
    }

    return(
        <label>Address Search Bar
            <input
                type="text"
                placeholder="e.g London"
                name="searchInput"
                onChange={handleChange}
                value={search}
            />
        </label>
    );
}

export default SearchBar;