import { useState, useEffect, useRef } from 'react';
import { useAddressSuggester } from '../hooks/useAddressSuggester';
import '../styles/SearchBarStyle.css';

const DEBOUNCE_TIME = 300; // How long the debouce lasts (milliseconds)

function SearchBar() {
    const {
        addressSuggestions,
        isAddressSuggesterLoading,
        addressSuggesterError,
        fetchAddressSuggestions
      } = useAddressSuggester();

    const [query, setQuery] = useState("");
    const [addressCache, setAddressCache] = useState(() => new Map);
    const debounceTimer = useRef(null);

    // Handle debouncing
    useEffect(() => {
        if(debounceTimer.current){
            clearTimeout(debounceTimer.current);
        }

        const trimmedQuery = query.trim().toLowerCase();

        // Only search for addresses if the query is longer than two letters
        if (trimmedQuery.length > 2){
            debounceTimer.current = setTimeout(async () => {
                try {
                   await fetchAddressSuggestions(trimmedQuery);
                }
                catch(err){
                    console.error(err);
                }
            }, (DEBOUNCE_TIME));
        }

        return () => {
            if(debounceTimer.current){
                clearTimeout(debounceTimer.current);
            }
        };
    }, [query, fetchAddressSuggestions]);

    // For debuging purposes
     useEffect(() => {
        console.log(addressSuggestions);
    }, [addressSuggestions]);


    function handleChange(event){
        setQuery(event.currentTarget.value);
    }

    return(
        <label>Address Search Bar
            <input
                type="text"
                placeholder="e.g London"
                name="searchInput"
                onChange={handleChange}
                value={query}
            />
        </label>
    );
}

export default SearchBar;