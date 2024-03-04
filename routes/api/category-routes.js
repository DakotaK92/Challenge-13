const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories, include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    });

    if (!categoriesData) {
      res.status(200).json({message: 'No categories found'});
      return;
    };

    res.status(200).json(categoriesData);

  } catch (err) {
    res.status(500).json(err);
  };
});

// find one category by its `id` value, include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryById) {
      res.status(200).json({message: 'No categories found'});
      return;
    };

    res.status(200).json(categoryById);

  } catch (err) {
    res.status(500).json(err);
  };
});

// create a new category
router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
		.then((newCategory) => res.status(200).json(newCategory))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  await Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
  .then(cat => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {res.json(err);});
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy(
      {
        where: {
          id: req.params.id,
        }
      });

      if (!deleteCategory) {
        res.status(200).json({message: 'No categories found'});
        return;
      };

      res.status(200).json(deleteCategory);
      console.log('Category deleted!');

  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;