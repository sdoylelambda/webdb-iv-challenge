const router = require('express').Router();

const Recipes = require('../data/recipes/recipe-model');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the recipes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'We could not find the recipe' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error retrieving the recipe' });
  }
});

router.post('/', async (req, res) => {
  const recipe = req.body;

  if (recipe.name) {
    try {
      const inserted = await Recipes.add(recipe);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'We ran into an error creating the recipe' });
    }
  } else {
    res.status(400).json({ message: 'Please provide name of the recipe' });
  }
});

router.put('/:id', async (req, res) => {
  const changes = req.body;

  if (changes.name) {
    try {
      const updated = await Recipes.update(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          message: 'That recipe does not exist',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'We ran into an error updating the recipe' });
    }
  } else {
    res.status(400).json({
      message: 'Please provide the name of the recipe',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Recipes.remove(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'That recipe does not exist, perhaps it was deleted already',
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'We ran into an error removing the recipe' });
  }
});

module.exports = router;
