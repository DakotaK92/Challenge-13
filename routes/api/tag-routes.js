const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags, include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(200).json({message: 'No tags found'});
      return;
    }

    res.json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`, include its associated Product data
router.get("/:id", (req, res) => {
	Tag.findByPk(req.params.id, {
			include: [{
				model: Product,
				attributes: ["id", "product_name", "price", "stock", "category_id"],
				through: "ProductTag",
			}],
		})
		.then((retrievedTag) => {
			res.json(retrievedTag);
		})
		.catch((err) => {
			res.json(err);
		});

	// be sure to include its associated Product data
});

// create a new tag
router.post("/", (req, res) => {
	// create a new tag
	Tag.create({
			tag_name: req.body.tag_name,
		})
		.then((tag) => {
			res.json(tag);
		})
		.catch((err) => {
			res.json(err);
		});
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
	Tag.update({
			tag_name: req.body.tag_name,
		},{
			where: {
				id: req.params.id,
			},
		})
		.then((tag) => {
			res.json(tag);
		})
		.catch((err) => {
			res.json(err);
		});
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(200).json({message: 'Tag not found'});
      return;
    }

    res.status(200).json(deleteTag);
    console.log('Tag deleted!');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;