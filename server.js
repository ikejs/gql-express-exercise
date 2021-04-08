require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const schema = buildSchema(`
enum Units {
  standard
  metric
  imperial
}

type Weather {
  temp: Float!
  description: String!
  feels_like: Float!
  temp_min: Int!
  temp_max: Int!
  pressure: Int!
  humidity: Int!
}

type Query {
  getWeather(zip: Int!, units: Units): Weather!
}
`);

const root = {
  getWeather: async ({ zip, units = 'imperial' }) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=${units}&appid=${process.env.OWM_API_KEY}`;
		const res = await fetch(url);
		const json = await res.json();
		const description = json.weather[0].description;
		return { ...json.main, description };
	}
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
