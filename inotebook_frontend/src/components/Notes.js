import React, { useEffect } from "react";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import NotesCard from "./NotesCard";
import AddNote from "./AddNote";
import "../style/notesCard.css";
import UpdateNote from "./UpdateNote";

function Notes() {
  //get a Notestate data using useContext hook, in NoteState data is wrapped using NoteContext so here we get it using useContext hook and import of NoteContext
  const context = useContext(NoteContext);

  //destructure a notes and getNote
  const { notes,modal, getNote, editNote,addNote } = context;
  // eslint-disable-next-line

  //useEffect fetch all the note from DB on every page loading time using getNote function which one we have get from the NoteContext
  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [editNote,addNote])

   

  return (
    <div>
      <div>
        <AddNote />
      </div>
      {modal && <UpdateNote/>}

      <h2>Your Notes</h2>
      <div>
        <div className="Note">
          <h2>{notes.length===0 && "No Notes Added"}</h2>
          {notes.map((note) => {
            //passing a notes data as a props to NotesCard component
            return <NotesCard key={note._id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
