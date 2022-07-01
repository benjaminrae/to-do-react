import "./List.css";
import Note from "../Note/Note";

const List = (props) => {
    return (
        <div className="list">
            <h2 className="list__title">{props.title}</h2>
            <div className="list__notes">
                {props.todos.length >= 1 &&
                    props.todos.map((todo, index) => (
                        <Note
                            title={todo.title}
                            content={todo.content}
                            key={index}
                            onDelete={props.onDelete}
                            id={todo.id}
                            status={todo.status}
                            onMoveRight={props.onMoveRight}
                            onMoveLeft={props.onMoveLeft}
                            onEdit={props.onEdit}
                        />
                    ))}
            </div>
            {props.title === "do" && (
                <button className="list__button" onClick={props.onAdd}>
                    add
                </button>
            )}
        </div>
    );
};

export default List;
