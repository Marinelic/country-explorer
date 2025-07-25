import { Link } from "react-router";
import type { Route } from "./+types/countries";
import { useState } from "react";


export async function clientLoader () {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population");
    const data = await res.json();
    return data;
}


export default function Countries ({ loaderData }: Route.ComponentProps) {

    const [search, setSearch] = useState<string>("");
    const [region, setRegion] = useState<string>("");

    const filteredCountries = loaderData.filter((country: any) => {

        const matchesRegion =
            !region || country.region.toLowerCase() === region.toLowerCase();

        const matchesSearch = 
            !search || country.name.common.toLowerCase().includes(search.toLowerCase());
            return matchesSearch && matchesRegion;
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by names..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-cyan-600" />

                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-cyan-600">
                            <option value="">All Regions</option>
                            <option value="africa">Africa</option>
                            <option value="americas">Americas</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                    </select>
            </div>

            {filteredCountries.length === 0 ? ( <div> No countries match your filteres. </div> ) : (

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredCountries.map((country: any, key: number) => (
                    <li 
                        key={key}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition">
                            <Link 
                                to={`/countries/${country.name.common}`}
                                className="text-cyan-600 hover:underline text-lg font-semibold"> 
                                    {country.name.common} 
                            </Link>

                        <div className="text-gray-700 text-sm mt-1">
                            Region: {country.region} | Population: {country.population}
                        </div>
                    </li>
                ))}
            </ul>
    )}
        </div>
    );
}