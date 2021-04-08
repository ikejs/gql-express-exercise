require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const schema = buildSchema(`
type Weather {
  temperature: Float!
  description: String!
}

type Query {
  getWeather(zip: Int!): Weather!
}
`);

const root = {
  getWeather: async ({ zip }) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.OWM_API_KEY}`;
		const res = await fetch(url);
		const json = await res.json();
    console.log(json);
		const temperature = json.main.temp;
		const description = json.weather[0].description;
		return { temperature, description };
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
