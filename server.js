// server.js
const express = require("express");
const os = require("os");
const entities = require("./entities");
const { getEntityNameById } = require("./entityFunctions");

const app = express();
const port = 3000;

// Роут стартовой страницы
app.get("/", (req, res) => {
  res.status(200).set("Content-Type", "text/plain").send("Home Page");
                      //заголовок     значение в txt
});

// Роут страницы информации об операционной системе
app.get("/info", (req, res) => {
  const osInfo = `OS System: ${os.platform()}`;
  res.status(200).set("Content-Type", "text/plain").send(osInfo);
});

// Роут списка сущностей
app.get("/entities", (req, res) => {
  const entityNames = entities.map((entity) => entity.name);
  res.status(200).set("Content-Type", "application/json").json(entityNames);
});

// Роут единичной сущности по ID
app.get("/entity/:id", (req, res) => {
  const entityId = req.params.id;
  const entityName = getEntityNameById(entityId);
  if (entityName) {
    res.status(200).set("Content-Type", "text/plain").send(entityName);
  } else {
    res.status(404).set("Content-Type", "text/plain").send("Entity not found");
  }
});

// Редирект на стартовую страницу
app.get("/redirect", (req, res) => {
  //Код состояния HTTP 302 означает "Found" (найдено) и используется для выполнения временного перенаправления. 
  res.redirect(302, "/");
});

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});



//add заголовок для всех запросов
//статус код