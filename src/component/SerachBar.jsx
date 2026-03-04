import { MapPin, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { searchCities } from "../service/WeatherApi";

function SerachBar({ onSearch, onLocationSearch, loading }) {
    const [query, setQuery] = useState("");
    const [suggestion, setSuggestions] = useState([]);
    const [showSuggestion, setShowSuggestions] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const searchRef = useRef();

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () =>
            document.removeEventListener("mousedown", handleClickOutSide);
    }, []);

    useEffect(() => {
        const searchTimeOut = setTimeout(async () => {
            if (query.length > 2) {
                setSearchLoading(true);

                try {
                    const result = await searchCities(query);
                    setSuggestions(result);
                    setShowSuggestions(true);
                } catch (err) {
                    console.error("Search Failed:", err);
                } finally {
                    setSearchLoading(false);
                }
            }else{
                setSuggestions([])
                setShowSuggestions(false)
            }
        }, 300);
        return() => clearTimeout(searchTimeOut)
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery("");
            setShowSuggestions(false);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSuggestionsClick = (city) => {
        const cityName = city.name ? `${city.name}, ${city.state}` : city.name;
        onSearch(cityName);
        setQuery("");
        setShowSuggestions(false);
    };

    return (
        <div className="relative  w-full max-w-2xl" ref={searchRef}>
            <form className="relative" onSubmit={handleSubmit}>
                <div className="relative group">
                    <Search
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray/60 
                        w-5 h-5 group-focus-within:text-white transition-all"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for any city worldwide..."
                        className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border
                        border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none
                        focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all
                        duration-300 hover:bg-white/15 "
                    />
                    {/* Conditional Rendering*/}
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50
                    hover:text-white transition-all p-1 rounded-full hover:bg-white/10 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}

                    <button
                        onClick={onLocationSearch}
                        disabled={loading}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50
                    hover:text-white transition-all p-1 rounded-full hover:bg-white/10 cursor-pointer"
                    >
                        <MapPin className="w-5- h-5" />
                    </button>
                </div>
            </form>
            {/* Conditional Rendering */}
            {showSuggestion && (suggestion?.length > 0 || searchLoading) && (
                <div
                    className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20
                rounded-2xl overflow-hidden z-50"
                >
                    {/* Conditional Rendering */}
                    {searchLoading ? (
                        <div className="p-6 text-center text-white/70">
                            <div className="animate-spin rounded-full w-6 h-6 mb-3 border-2 border-white/30 border-t-white mx-auto"></div>
                            <p>Search Cities...</p>
                        </div>
                    ) : (
                        suggestion.map((city, index) => {
                            return (
                                <button
                                    onClick={() => handleSuggestionsClick(city)}
                                    key={index}
                                    className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200
                                    flex items-center justify-between group border-b border-white/10 last:border-b-0"
                                >
                                    <div>
                                        <div className="font-medium text-white group-hover:text-white/90">
                                            {city.name}

                                            {city.state && (
                                                <span className="text-white/70">, {city.state}</span>
                                            )}
                                        </div>
                                    <div className="text-sm text-white/60">
                                        {city.country}
                                    </div>
                                    </div>
                                    <Search className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-all" />
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

export default SerachBar;
