import React from "react";
import "../style/notesCard.css";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NotesCard(props) {
  const { note } = props;

  //get a Notestate data using useContext hook, in NoteState data is wrapped using NoteContext so here we get it using useContext hook and import of NoteContext
  const context = useContext(NoteContext);

  //destructure a deletenote and use it in Delet button onclick with passing a notes id
  const { deleteNote, changeNote } = context;
  // eslint-disable-next-line

  return (
    <div className="NoteCard">
      <div className="NoteHeading">
        <h4>{note.title}</h4>
        <div>
          <AiOutlineEdit onClick={() => {
              changeNote(note);
            }} />

          <RiDeleteBin4Line
            onClick={() => {
              deleteNote(note._id);
            }}
          />
        </div>
      </div>

      <p>{note.description}</p>
    </div>
  );
}

export default NotesCard;
