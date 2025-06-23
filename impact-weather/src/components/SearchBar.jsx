import { useState, useEffect, useRef } from 'react';
import { useAddressSuggester } from '../hooks/useAddressSuggester';
import '../styles/SearchBarStyle.css';

const DEBOUNCE_TIME = 300; // How long the debounce lasts (milliseconds)

function SearchBar() {
    const {
        addressSuggestions,
        isAddressSuggesterLoading,
        addressSuggesterError,
        fetchAddressSuggestions
    } = useAddressSuggester();

    const [query, setQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const debounceTimer = useRef(null);

    // Handle debouncing
    useEffect(() => {
        if(debounceTimer.current){
            clearTimeout(debounceTimer.current);
        }

        const trimmedQuery = query.trim().toLowerCase();

        // Clear error message when user starts typing
        setErrorMessage(null);

        // Only search for addresses if the query is longer than two letters
        if (trimmedQuery.length > 2){
            debounceTimer.current = setTimeout(async () => {
                try {
                    await fetchAddressSuggestions(trimmedQuery);
                }
                catch(err){
                    if (addressSuggesterError?.status === 429){
                        setErrorMessage("Search not available");
                    }
                    else {
                        setErrorMessage("Try again");
                    }
                }
            }, DEBOUNCE_TIME);
        }

        return () => {
            if(debounceTimer.current){
                clearTimeout(debounceTimer.current);
            }
        };
    }, [query, fetchAddressSuggestions]);

    // Handle "no results found" case as it doesn't update immediatly - only when not loading and search is complete
    useEffect(() => {
        if (!isAddressSuggesterLoading && query.trim().length > 2) {
            if (addressSuggestions && addressSuggestions.length === 0) {
                setErrorMessage("No results found");
            } else if (addressSuggestions && addressSuggestions.length > 0) {
                setErrorMessage(null); // Clear error if results are found
            }
        }
    }, [addressSuggestions, query, isAddressSuggesterLoading]);

    // For debugging purposes
    useEffect(() => {
        console.log('Address suggestions:', addressSuggestions);
        console.log('Error message:', errorMessage);
    }, [addressSuggestions, errorMessage]);

    function handleChange(event){
        setQuery(event.currentTarget.value);
    }

    return(
        <div>
            <label>Address Search Bar
                <input
                    type="text"
                    placeholder="e.g London"
                    name="searchInput"
                    onChange={handleChange}
                    value={query}
                />
            </label>
            {errorMessage && <p>{errorMessage}</p>}
            {isAddressSuggesterLoading && <p>Loading...</p>}
        </div>
    );
}

export default SearchBar;