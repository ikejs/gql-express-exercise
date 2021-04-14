import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import DisplayWeather from "./DisplayWeather";

const makeQuery = (zip, units) => {
  const GET_WEATHER = gql`
    {
      getWeather(zip: ${zip}, units: ${units}) {
        temp,
        city,
        description,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity
      }
    }
  `;
  return GET_WEATHER;
};

export default function Weather() {

  // const [coordinates, setCoordinates] = useState({});
  const [zip, setZip] = useState(94122);

  // useEffect(() => {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setCoordinates({ 
  //         lat: position.coords.latitude,
  //         lon: position.coords.longitude
  //       });
  //     });  
  //   }
  // })

  const { loading, error, data } = useQuery(
    makeQuery(
      zip, 
      // coordinates.lat, 
      // coordinates.lon, 
      "imperial"
      )
    );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div style={styles.form}>
        <input type="text" value={zip} onChange={(e)=>setZip(e.target.value)} placeholder="Zip Code" autoFocus style={styles.input} />
      </div>
      <DisplayWeather {...data.getWeather} />
    </>
  );
}

const styles = {
  input: {
    padding: '0.3em',
    fontSize: '1.5em',
    border: 'none',
    borderRadius: '6px',
    marginBottom: '2em',
  }
}