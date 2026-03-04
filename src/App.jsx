import ErrorMessage from "./component/ErrorMessage";
import LoadingSpinner from "./component/LoadingSpinner";
import SerachBar from "./component/SerachBar";
import TempreatureToggle from "./component/TempreatureToggle";
import WeatherCart from "./component/WeatherCart";
import WeatherForecat from "./component/WeatherForecat";
import { useWeather } from "./hooks/useWeather";

function App() {
    const {
        currentWeather,
        forecast,
        loading,
        error,
        unit,
        fetchWeatherByCity,
        fetchWeatherByLocation,
        toggleUnit,
    } = useWeather();

    const handleRetry = () => {
        if(currentWeather){
            fetchWeatherByCity(currentWeather.name)
        }else{
            fetchWeatherByCity('New York')
        }
    }

    return (
        <div className=" min-h-screen relative overflow-hidden">
            {/* Backround Image With Overlay*/}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
                }}
            >
                <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
                <div className="absolute inset-0  bg-black-20"></div>
            </div>
            <div className="relative z-10 py-8 px-4 container mx-auto min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Hader section */}
                    <div className="text-center mb-12">
                        <div className="mb-8">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                                Weather{" "}
                                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Pro
                                </span>
                            </h1>
                            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                                Experience weather like never before with
                                real-time data, beautiful visuals, and precise
                                forecasts for any location worldwide
                            </p>
                        </div>
                        <div
                            className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0
                          lg:space-x-6 mb-12"
                        >
                            <SerachBar
                                onSearch={fetchWeatherByCity}
                                onLocationSearch={fetchWeatherByLocation}
                                loading={loading}
                            />
                            <TempreatureToggle unit={unit} onToggle={toggleUnit}/>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Condetion Rendering */}
                        {loading && (
                            <div className="flex justify-center">
                                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                                    <LoadingSpinner />
                                    <p className="text-white/80 text-center mt-4 font-medium">
                                        Fetching latest weather data...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Conditional Rendering */}
                        {error && !loading && (
                            <div className="max-w-2xl mx-auto">
                                <ErrorMessage message={error} onRetry={handleRetry}/>
                            </div>
                        )}

                        {/* Conditional Rendering */}
                        {currentWeather && !loading && (
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                <div className="xl:col-span-2">
                                    <WeatherCart weather={currentWeather} unit={unit}/>
                                </div>
                                <div className="xl:col-span-1">
                                    {/* Conditional Rendering */}
                                    {forecast && <WeatherForecat forecast={forecast} unit={unit} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
