const express = require('express')
const router = express.Router();

const Resource = require('../models/resource')

router.get('/', async(req, res) => {
    const resources = await Resource.find();
    res.json(resources);
    //console.log(resources);
});

router.get('/:id', async (req, res) => {
    const resources = await Resource.find();
    res.json(resources);
});

router.post('/', async(req, res) => {
    //console.log(req.body);
    const { titulo, claves, descripcion, fuente, tiporecurso, cobertura} = req.body;
    const resource = new Resource({
        titulo, claves, descripcion, fuente, tiporecurso, cobertura
    });
    await resource.save();
    //console.log(resource);
    res.json({status: 'Resource saved'});
});

router.put('/:id', async (req, res) => {
    const { titulo, claves, descripcion, fuente, tiporecurso, cobertura} = req.body;
    const newRes = {titulo, claves, descripcion, fuente, tiporecurso, cobertura};
    await Resource.findByIdAndUpdate(req.params.id, newRes);
    //console.log(req.params.id);
    res.json({status: 'Resource updated'});
});

router.delete('/:id', async (req, res) => {
    await Resource.findByIdAndRemove(req.params.id);
    res.json({status: 'Resource deleted'});
});

module.exports = router;