const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags ,include its associated Product data
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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`, include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    res.status(200).json(tagById);

  } catch (err) {
    res.status(500).json(err);
  }
});

 // create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tagName
    });

    res.status(200).json(newTag);
    console.log('Tag created');

  } catch(err) {
    res.status(500).json(err);
  } 
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tegName
    },
    {
      where: {
        id: params.id
      }
    });
    
    // sends a message if an input doesn not exist
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagById) {
      res.status(200).json({message: 'Tag not found'});
      return;
    };

    res.status(200).json(updateTag);
    console.log('Tag updated!');

  }catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
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
