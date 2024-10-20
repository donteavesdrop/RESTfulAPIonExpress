// entityFunctions.js
const entities = require("./entities");

function getEntityNameById(id) {
  const entity = entities.find((entity) => entity.id === Number(id));
  return entity ? entity.name : "Entity not found";
}

module.exports = { getEntityNameById };
