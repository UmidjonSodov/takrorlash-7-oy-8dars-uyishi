const API_KEY = "02aaed13226e2dd51a749ac7ac4c8686";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export const getCurrentWeather = async (city) => {
    try {
        const res = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
        );

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(
                    `city ${city} not found, please check the spelling and try again`,
                );
            } else if (res.status === 401) {
                throw new Error(
                    `Invalid API Key, please check your OpenWeatherMap API configuretion`,
                );
            } else {
                throw new Error(
                    "Weather service is temporarily unvailable. Please try again later.",
                );
            }
        }

        const data = await res.json();

        // ensure we have the current timestap if not provided
        if (!data.dt) {
            data.dt = Math.floor(Date.now() / 1000);
        }
        return data;
    } catch (error) {
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error(
                "Network error, please check your internet connection and try again",
            );
        }
        throw error;
    }
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
    try {
        const res = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        );

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error(
                    `Invalid API Key, please check your OpenWeatherMap API configuretion`,
                );
            } else {
                throw new Error(
                    "Weather service is temporarily unvailable. Please try again later.",
                );
            }
        }

        const data = await res.json();

        // ensure we have the current timestap if not provided
        if (!data.dt) {
            data.dt = Math.floor(Date.now() / 1000);
        }
        return data;
    } catch (error) {
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error(
                "Network error, please check your internet connection and try again",
            );
        }
        throw error;
    }
};

export const getWeatherForecast = async (city) => {
    try {
        const res = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
        );

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(
                    `city ${city} not found, please check the spelling and try again`,
                );
            } else if (res.status === 401) {
                throw new Error(
                    `Invalid API Key, please check your OpenWeatherMap API configuretion`,
                );
            } else {
                throw new Error(
                    "Weather service is temporarily unvailable. Please try again later.",
                );
            }
        }

        return await res.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error(
                "Network error, please check your internet connection and try again",
            );
        }
        throw error;
    }
};

export const searchCities = async (query) => {
    try {
        const res = await fetch(
            `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
        );

        if (!res.ok) {
            if (res.status === 401) {
                throw new Error(
                    `Invalid API Key, please check your OpenWeatherMap API configuretion`,
                );
            } else {
                throw new Error(
                    "Weather service is temporarily unvailable. Please try again later.",
                );
            }
        }

        const data = await res.json();

        // transform the geocoding api response to match our expceted format
        return data.map((city) => ({
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            country: city.country,
            state: city.state || "",
        }));
    } catch (error) {
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error(
                "Network error, please check your internet connection and try again",
            );
        }
        throw error;
    }
};
