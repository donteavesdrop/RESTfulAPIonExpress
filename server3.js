const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const entities = require("./entities");
const port = 3001;
app.use(bodyParser.json());

// Получение списка сущностей
app.get('/entities', (req, res) => {
    res.json(entities);
});

// Получение сущности по ID
app.get('/entities/:id', (req, res) => {
    const id = Number(req.params.id);
    const entity = entities.find(entity => entity.id === id);
    if (entity) {
        res.json(entity);
    } else {
        res.status(404).json({ message: 'Сущность не найдена' });
    }
});

//curl -X POST http://localhost:3001/entities
// Создание новой сущности
app.post('/entities', (req, res) => {
    const newEntity = req.body;
    newEntity.id = entities.length + 1;
    entities.push(newEntity);
    res.status(201).json(newEntity);
});

// Обновление существующей сущности
//curl -X PUT -H "Content-Type: application/json" -d "{\"name\": \"Entity 2\"}" http://localhost:3001/entities/2
app.put('/entities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entity = entities.find(entity => entity.id === id);
    if (entity) {
        entity.name = req.body.name;
        res.json(entity);
    } else {
        res.status(404).json({ message: 'Сущность не найдена' });
    }
});

//curl -X DELETE http://localhost:3001/entities/2
// Удаление сущности по ID
app.delete('/entities/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = entities.findIndex(entity => entity.id === id);
    if (index !== -1) {
        entities.splice(index, 1);
        res.json({ message: 'Сущность удалена' });
    } else {
        res.status(404).json({ message: 'Сущность не найдена' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});