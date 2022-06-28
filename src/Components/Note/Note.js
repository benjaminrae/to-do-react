import "./Note.css";

const Note = (props) => {
    const id = props.id;
    return (
        <div className="note">
            <h3 className="note__title">{props.title}</h3>
            <p>{props.content}</p>

            <div className="note__buttons">
                <button onClick={props.onEdit} id={props.id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    {/* edit */}
                </button>
                <button id={id} onClick={props.onDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                    {/* del */}
                </button>
                {props.status !== 0 && (
                    <button id={props.id} onClick={props.onMoveLeft}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                )}
                {props.status !== 2 && (
                    <button id={props.id} onClick={props.onMoveRight}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Note;
