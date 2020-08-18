const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, urls, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    urls,
    techs,
    like: 0
  }

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params; 
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repositoryIndex => repositoryIndex.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).send({"error": "Repository not exist"});
  }
  
  const like = repositories[repositoryIndex].like
  const repository = {
    id,
    url, 
    title, 
    techs,
    like
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repositoryIndex => repositoryIndex.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  repository.like++;
  return response.json(repository)
});

module.exports = app;
