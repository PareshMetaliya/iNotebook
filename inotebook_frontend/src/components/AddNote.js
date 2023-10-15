import React, { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import "../style/home.css";

function AddNote() {
  //get a Notestate data using useContext hook, in NoteState data is wrapped using NoteContext so here we get it using useContext hook and import of NoteContext
  const context = useContext(NoteContext);

  //destructure a addnote
  const { addNote, } = context;
  // eslint-disable-next-line

//Generate UseState hookfor save change data in the add note FORM and use it on onChange function
const[note,setNote]=useState({title:"",description:"",tag:""})

  


  //Onchange function for get the value from FORM input tags
  const onChange = (e) => {
    setNote({...note, [e.target.name]:e.target.value})
  };

  //Add Button handle using this function
  const handleClick = (e) => {
    e.preventDefault();
    //calling a addNOte function with its value
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
  };

  return (
    <div>
      <h2>Add Note</h2>
      <div className="Home">
        <form className="NoteForm">
          <label htmlFor="title">
            <h5>Title:</h5>
          </label>
          <input type="text" id="title" name="title" value={note.title} placeholder="Min 3 char required" onChange={onChange} />
          <br />
          <label htmlFor="description">
            <h5>Description:</h5>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={note.description}
            placeholder="Min 5 char required"
            onChange={onChange}
          />
          <br />
          <label htmlFor="tag">
            <h5>Tag:</h5>
          </label>
          <input type="text" id="tag" name="tag" value={note.tag} onChange={onChange} />
          <div className="btn">
            <button  type="submit" onClick={handleClick}>
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
