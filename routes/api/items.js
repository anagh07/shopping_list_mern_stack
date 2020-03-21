const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Bring in db model
const Item = require("../../models/Items");

// @route       GET /api/items
// @description Find all the items
// @access      Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => {
      res.json(items);
      console.log("DEBUG: Show all items");
    });
});

// @route       POST /api/items
// @description Add a new item
// @access      Public
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(items => {
    res.json(items);
    console.log("DEBUG: Added new item");
  });
});

// @route       GET /api/items/:id
// @description Find an item
// @access      Public
router.get("/:id", (req, res) => {
  Item.findById(req.params.id).then(item => {
    res.json(item);
    console.log("DEBUG: Find an item");
  });
});

// @route       DELETE /api/items/:id
// @description Delete an item
// @access      Public
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => {
        res.json({ success: true });
        console.log("DEBUG: Deleted item");
      })
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
