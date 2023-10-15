const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


let Success= false;
//Route1: Fetchall notes of user using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //If fetcheuser middle ware run correctly than fetch all notes of that user fromnotes collecction
    //Notes.find is a method of moonfose to get data from DB and Notes is a schema model import
    const note = await Notes.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route2:Add notes of user using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    // title must be at least 3 chars long
    body("title", "title Must be a 3 char").isLength({ min: 3 }),
    // description must be at least 5 chars long
    body("description", "description Must be a 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Take a note data from body and destructure it
      const { title, description, tag } = req.body;

      //put all destructred data from the body to the schema of DB notes
      //Notes is import schema from Notes Models & save that schema in"note name const
      const note = new Notes({ title, description, tag, user: req.user.id });

      //save the note to DB
      //note.save as we have save a schema to the note name
      const savedNote = await note.save();
      
      let Success=true;
      // res.json(savedNote._id,Success);
      res.json({Success});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route3:Update notes of user using: Put "/api/notes/updatenote:id". Login required
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      // Take a note data from body and destructure it
      const { title, description, tag } = req.body;

      //creater a newNote for update a data in it
      const newNote = {};

      //update a newNote object using a data that we have get from body using a destructuring of it from req.body
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //Find the note to be updated using a id of it that is passed in api re :id param
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      //If note found than again validate a user login data id with note user id
      //note is a saved note from the DB, so user id is saved in User:***, and we get user id from fetchuser middleware using req.user.id from header data
      //match both id for authentication
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than update a note with newNote object which one is get data frombody and save in updatedNote
      const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      let Success=true;
      // res.json({Success});
      res.json({updatedNote,Success});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route4:Delete notes of user using: Delete "/api/notes/deletenote:id". Login required
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      //Find the note to be needed to delete using a id of it that is passed in api re :id param
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      //If note found than again validate a user login data id with note user id
      //note is a saved note from the DB, so user id is saved in User:***, and we get user id from fetchuser middleware using req.user.id from header data
      //match both id for authentication
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      //If all authentication is valid than delete a note with id
      const updatedNote = await Notes.findByIdAndDelete(req.params.id);
      let Success=true;
      res.json({Success});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
