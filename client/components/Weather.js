import { useQuery, gql } from "@apollo/client";

const GET_WEATHER = gql`
  query getWeather($zip: String!, $units: String!) {
    getWeather(zip: $zip, units: $units) {
      temperature
    }
  }
`;

export default function Weather() {
  const { loading, error, data } = useQuery(GET_WEATHER, {
    variables: { zip: "54935", units: "imperial" },
  });

  console.log(data);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      {JSON.stringify(data)}
    </>
  );
}