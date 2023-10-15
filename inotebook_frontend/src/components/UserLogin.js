import React from "react";
import "../style/home.css";
import Notes from "./Notes";
// import AddNote from "./AddNote";

// const onChange = (e) => {};

// const handleClick = (e) => {
//   e.preventDefault();
// };

function UserLogin() {
  return (
    <div>
      <div>
        <div className="Notes">
          <div className="Notescard">
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
