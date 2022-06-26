import "./List.css";
import Note from "../Note/Note";

const List = (props) => {
    return (
        <div className="list">
            <h2 className="list__title">{props.title}</h2>
            {props.notes.length > 1 &&
                props.notes.map((note, index) => (
                    <Note
                        title={note.title}
                        content={note.content}
                        key={index}
                    />
                ))}
            {props.title === "do" && (
                <button className="list__button" onClick={props.onAdd}>
                    add
                </button>
            )}
        </div>
    );
};

export default List;
