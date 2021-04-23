require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());

// fake db
const tasks = [];

const schema = buildSchema(`
enum Units {
  standard
  metric
  imperial
}

type Weather {
  temp: Float!
  city: String!
  description: String!
  feels_like: Float!
  temp_min: Float!
  temp_max: Float!
  pressure: Float!
  humidity: Float!
}

type Task {
  name: String!
  completed: Boolean!
}

type Query {
  getWeather(zip: Int!, lat: Float, lon: Float,  units: Units): Weather!,
  getTasks: [Task!]!
}

type Mutation {
  createTask(name: String!): Task!,
  updateTask(index: Int!, newName: String!): Task!,
  deleteTask(index: Int!): Task!
}
`);

const root = {
  getWeather: async ({ zip, lat, lon, units = "imperial" }) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?${zip ? 'zip=' + zip : 'lon=' + lon + '&lat=' + lat }&units=${units}&appid=${process.env.OWM_API_KEY}`;
		const res = await fetch(url);
		const json = await res.json();
    if (json.cod !== 200) {
      throw new Error("Invalid ZIP code.");
    }
		const description = json.weather[0].description;
    const city = json.name;
		return { 
      ...json.main,
      city,
      description,
    };
	},
  getTasks: () => {
    return tasks;
  },
  createTask: ({ name }) => {
    const task = { 
      name, 
      completed: false,
    };
    tasks.push(task);
    return task;
  },
  updateTask: ({ index, newName }) => {
    const task = tasks[index];
    task.name = newName;
    return task;
  },
  deleteTask: ({ index }) => {
    const task = tasks[index];
    tasks.splice(index, 1);
    return task;
  },
}

app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = 4000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
