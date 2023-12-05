import React, {useEffect, useState} from "react";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {onValue, ref} from "firebase/database";
import {db} from "./index";

function App() {
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [heatIndex, setHeatIndex] = useState(0);

    useEffect(() => {
        const data = ref(db, "dht22/");
        onValue(data, (snapshot) => {
            const val = snapshot.val();
            setTemperature(val.temperature);
            setHumidity(val.humidity);
            setHeatIndex(val.heatindex.toFixed(1));
        });
    });

    return (
        <div className="p-5 bg-white dark:bg-gray-900 antialiased min-h-screen">
            <div className="flex flex-col justify-center items-center h-full">
                <p className="mb-2 text-gray-900 text-3xl dark:text-white">Projek Akhir Mikrokontroler</p>
                <div className="mb-2">
                    <span
                        className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Device Online
                    </span>
                </div>
                <div className="flex flex-col items-center p-4">
                    <div className="flex flex-col md:flex-row md:space-x-4 w-full">
                        <div className="flex-none self-center w-full md:w-1/4 mb-4 md:mb-0">
                            <div
                                className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="text-center mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Humidity
                                </h5>
                                <CircularProgressbar value={humidity} text={`${humidity}%`}/>
                            </div>
                        </div>
                        <div className="flex-none w-full md:w-1/2 mb-4 md:mb-0">
                            <div
                                className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="text-center mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Temperature
                                </h5>
                                <CircularProgressbar value={temperature} text={`${temperature}°C`}/>
                            </div>
                        </div>
                        <div className="flex-none self-center w-full md:w-1/4">
                            <div
                                className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="text-center mb-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    Heat Index
                                </h5>
                                <CircularProgressbar value={heatIndex} text={`${heatIndex}°C`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;


