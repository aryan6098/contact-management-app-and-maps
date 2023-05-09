import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useGetCountryDataQuery } from "../store/services/covidApi";

type CountryDataTypes = {
  country: string;
  countryInfo: { lat: number; long: number; _id: number };
  active: number;
  recovered: number;
  deaths: number;
};

const covidIcon = L.icon({
  iconUrl: "https://img.icons8.com/color/48/000000/coronavirus.png",
  iconSize: [35, 35],
});

function CovidMap() {
  const { data: countryData, isLoading } = useGetCountryDataQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-auto h-fit">
      <MapContainer center={[10, -0.1]} zoom={2} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countryData &&
          Object.values<CountryDataTypes>(countryData).map(
            (country: CountryDataTypes, index: number) => (
              <Marker
                key={index}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={covidIcon}
              >
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Active Cases: {country.active}</p>
                    <p>Recovered: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            )
          )}
      </MapContainer>
    </div>
  );
}

export default CovidMap;
