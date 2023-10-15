import React, { useState } from "react";
import NoteContext from "./noteContext";
import toast from 'react-hot-toast';

const NoteState = (props) => {
  
  const host = `${process.env.REACT_APP_HOST}/api/notes`;

  //Read the Note
  let notesInitial = [];

  //passing the notes data which one saved as a initial notes as props in context so caan use and modify notes
  const [notes, setNotes] = useState(notesInitial);
  const [currentnote, setCurrentnote] = useState();
  const [modal, setModal] = useState(false);

  //Get all Notes
  const getNote = async () => {
    //TODO: api call

    const response = await fetch(`${host}/fetchallnotes`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "GET",
      headers: {
        auth_Token:
          localStorage.getItem('token'),
      },
    });

    //parse json response in fetchedNotes
    const fetchedNotes = await response.json();

    //use a setNote hook for set the fetched notes in notes hook for show it to display
    setNotes(fetchedNotes);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    //TODO: api call

    const response = await fetch(`${host}/addnote`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
        auth_Token:
          localStorage.getItem('token'),
      },

      // body data type must match "Content-Type" header

      body: JSON.stringify({ title, description, tag }),
    });

    // // parses JSON response into native JavaScript objects
    const json = await response.json();
    if (json.Success) {
      
      toast.success('Added Successfully!');
    }
    
  };

  //Delete Note
  const deleteNote = async (id) => {
    //TODO: api call
    //TODO: api call

    const response = await fetch(`${host}/deletenote/${id}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "DELETE",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
        auth_Token:
          localStorage.getItem('token'),
      },
    });

    // parses JSON response into native JavaScript objects
    const json = await response.json();
   
    if (json.Success) {
      
      toast.success('Deleted Successfully!');
    }

    //---------Following the code is for Delet a note from Front-End--------
    //Get the note Id and amtch it with db Notes id, than use array filter method to get the new array of notes without delet note id using following function
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });

    //passing a newNote which one have not a deleted Note & pass it to new note so note will be deleted
    setNotes(newNote);
  };

  //Current Note which one we required to edit using edit button
  const changeNote = (currentNote) => {
    setCurrentnote(currentNote);
    setModal(true);
  };

  //Update Note -- calling edit note api function using getting updated value from the Updatenote components
  const updateNote = (id, title, description, tag) => {
    editNote(id, title, description, tag);
    setModal(false);
  };

  const closeNote=(data)=>{
    setModal(data)
  }

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //TODO: api call

    const response = await fetch(`${host}/updatenote/${id}`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "PUT",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
        auth_Token:
          localStorage.getItem('token'),
      },

      // body data type must match "Content-Type" header

      body: JSON.stringify({ title, description, tag }),
    });

    // parses JSON response into native JavaScript objects
    const json = await response.json();
    
    if (json.Success) {
      
      toast.success('Updated Successfully!');
    }
    //Eterate a notes array and find the note with same id for edit it
    //after getting that id with IF function than edit its three properies

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    //wrapp data in NoteContext which one imported from notecontext and passing fetched notes as a props
    <NoteContext.Provider
      value={{
        notes,
        currentnote,
        modal,
        getNote,
        addNote,
        deleteNote,
        editNote,
        updateNote,
        changeNote,
        closeNote
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
