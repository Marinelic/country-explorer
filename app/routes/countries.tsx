import type { Route } from "./+types/countries";
import React from "react";
import { Link } from "react-router";


export async function clientLoader () {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population");
    const data = await res.json();
    return data;
}


export default function Countries ({ loaderData }: Route.ComponentProps) {

    console.log(loaderData);
    return (
        <div>

            <h2>Countries</h2>

            <div>
                <input type="text" placeholder="Search by names..." />
            </div>

            <ul>
                {loaderData.map((country: any, key: number) => (
                    <li 
                        key={key}>
                        <Link to={`/countries/${country.name.common}`}> {country.name.common} </Link>

                        <div>
                            Region: {country.region} | Population: {country.population}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}