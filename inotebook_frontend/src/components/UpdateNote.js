
import React, { useState } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import "../style/home.css";

function UpdateNote() {

  //get a Notestate data using useContext hook, in NoteState data is wrapped using NoteContext so here we get it using useContext hook and import of NoteContext
  const context = useContext(NoteContext);

  //destructure a addnote
  const { currentnote, updateNote,closeNote } = context;
  // eslint-disable-next-line

//Generate UseState hookfor save change data in the add note FORM and use it on onChange function
const[note,setNote]=useState(currentnote)
  


  //Onchange function for get the value from FORM input tags
  const onChange = (e) => {
    setNote({...note, [e.target.name]:e.target.value})
  };

  //Add Button handle using this function
  const handleClick = (e) => {
    e.preventDefault();
    //calling a addNOte function with its value
    updateNote(note._id,note.title,note.description,note.tag);
  };
  const handleClickClose=(e)=>{
    e.preventDefault();
    closeNote(false);
  }

  return (
    <div>
    <div className="updatenote">

      <div className="Home2">
      <div className="editnav">
      <h2>Edit Note</h2>
      <div className="close" onClick={handleClickClose}>X</div>
      </div>
      <div className="Home">
        <form className="NoteForm">
          <label htmlFor="title">
            <h5>Title:</h5>
          </label>
          <input type="text" id="title" name="title" value={note.title} onChange={onChange} />
          <br />
          <label htmlFor="description">
            <h5>Description:</h5>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
          <br />
          <label htmlFor="tag">
            <h5>Tag:</h5>
          </label>
          <input type="text" id="tag" name="tag"  value={note.tag} onChange={onChange} />
          <div className="btn">
            <button type="submit" onClick={handleClick}>
              Edit Note
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );

}

export default UpdateNote
