const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(`<h1>Hello World</h1>`);
});
app.get(`/info`, (request, response) => {
  response.send(`Phonebook has info for ${phonebook.length} people <br/>
  ${new Date()}
  `);
});

app.get(`/api/phonebook`, (request, response) => {
  response.json(phonebook);
});

app.get(`/api/phonebook/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((p) => p.id === id);
  person
    ? response.json(person)
    : response.status(404).json({
        error: "No data found",
      });
});

app.delete(`/api/phonebook/:id`, (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((p) => p.id)) : 0;
  return maxId + 1;
};

morgan.token("post-data", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.post(`/api/phonebook`, (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "Content Missing",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  const isNameExist = phonebook.find((p) => p.name === body.name);
  console.log(isNameExist);
  isNameExist
    ? response.status(404).json({
        error: `${body.name} already exists`,
      })
    : (phonebook = phonebook.concat(person));
  response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
