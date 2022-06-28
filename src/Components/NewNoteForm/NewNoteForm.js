import { useState } from "react";
import "./NewNoteForm.css";

const NewNoteForm = (props) => {
    return (
        <div className="new-note__window" id="new-note__window">
            <form className="new-note__form">
                <button onClick={props.onCancel} className="new-note__cancel">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <label htmlFor="new-note__title">What's the task?</label>
                <input
                    onChange={props.onTitleChange}
                    id="new-note__title"
                    className="new-note__title"
                    value={props.titleValue}
                ></input>
                <label htmlFor="new-note__content">
                    Describe what you have to do
                </label>
                <textarea
                    id="new-note__content"
                    className="new-note__content"
                    rows="5"
                    cols="30"
                    onChange={props.onContentChange}
                    value={props.contentValue}
                ></textarea>
                <button
                    onClick={props.editMode ? props.onEdit : props.onSave}
                    className="new-note__submit"
                >
                    save
                </button>
            </form>
        </div>
    );
};

export default NewNoteForm;
