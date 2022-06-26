import "./Note.css";

const Note = (props) => {
    return (
        <div className="note">
            <h3 className="note__title">{props.title}</h3>
            <p className="note__content">{props.content}</p>

            <button>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <button>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
};

export default Note;
