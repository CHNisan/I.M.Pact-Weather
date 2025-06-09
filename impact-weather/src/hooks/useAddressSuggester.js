import { useState, useCallback } from "react";
import { getLocationSuggestionsFromAddress } from "../services/locationService";

/**
 * Custom hook for fetching location suggests based of an full/partial address
 * @param {string} query - The input address query 
 * @returns {Array<Object>} - Array of location suggestion objects (Geoapify Feature objects) and related functions
 */
export function useAddressSuggester(){
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = "6e011eab838a460f96f0fa3f2e6e651c";

    const fetchAddressSuggestions = useCallback(async (query) => {
        // Input validation
        if(!query.trim()){
            setSuggestions([])
            return;
        }

        setIsLoading(true);
        setError(null);

        try{
            const results = await getLocationSuggestionsFromAddress(query, API_KEY);
            setSuggestions(results);
        } catch(err) {
            const suggestionError = new Error(
                "Unable to find locations. Please try again."
            );
            suggestionError.status = err.status;
            suggestionError.statusText = err.statusText;
            setError(suggestionError)
            setSuggestions([]);
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