import { useState, useCallback, useRef } from "react";
import { getLocationSuggestionsFromAddress } from "../services/locationService";

const MAX_CACHE_SIZE = 50; // Maximum number of cached queries

/**
 * Custom hook for fetching location suggests based of an full/partial address
 * @param {string} query - The input address query 
 * @returns {<Object>} - Array of location suggestion objects (Geoapify Feature objects) and related functions
 */
export function useAddressSuggester(){
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const cache = useRef(new Map()); // Cache of queried addresses
    const abortController = useRef(null);
    const API_KEY = "6e011eab838a460f96f0fa3f2e6e651c";

    const fetchAddressSuggestions = useCallback(async (query="") => {
        if (abortController.current){
            abortController.current.abort();
        }

        abortController.current = new AbortController();

        // Input validation
        if(!query.trim()){
            setSuggestions([]);
            setError(null);
            return;
        }

        const trimmedQuery = query.trim();

        // Check cache first
        if (cache.current.has(trimmedQuery)) {
            // Move to end (most recently used) by delete and re-insert
            const cachedResult = cache.current.get(trimmedQuery);
            cache.current.delete(trimmedQuery);
            cache.current.set(trimmedQuery, cachedResult);
            
            setSuggestions(cachedResult);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try{
            const results = await getLocationSuggestionsFromAddress(trimmedQuery, API_KEY, abortController.current.signal);
            
            if (cache.current.size >= MAX_CACHE_SIZE) {
                // Remove oldest entry (first in insertion order)
                const oldestQuery = cache.current.keys().next().value;
                cache.current.delete(oldestQuery);
            }
            
            // Add new entry to cache
            cache.current.set(trimmedQuery, results);
            
            setSuggestions(results);
        } catch(err) {
            if (err.name !== 'AbortError') {
                const suggestionError = new Error(
                    "Unable to find locations. Please try again."
                );
                suggestionError.status = err?.status;
                suggestionError.statusText = err?.statusText;
                suggestionError.responseText = err?.responseText;
                setError(suggestionError)
                setSuggestions([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        addressSuggestions: suggestions,
        isAddressSuggesterLoading: isLoading,
        addressSuggesterError: error,
        fetchAddressSuggestions,
    };
};