import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Footer from "./Components/Footer/Footer";
import NewNoteForm from "./Components/NewNoteForm/NewNoteForm";
import todoService from "./services/todos";
import ToastNotification from "./Components/ToastNotification/ToastNotification";

function App() {
    const [todos, setTodos] = useState([
        { title: "test note", content: "", status: 0 },
    ]);
    const [doList, setDoList] = useState([]);
    const [doingList, setDoingList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [notification, setNotification] = useState("");
    const [todoToEdit, setTodoToEdit] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        console.log("effect");
        todoService.getAll().then((response) => {
            console.log("promise fulfilled");
            setTodos(response);
        });
    }, []);

    useEffect(() => {
        setDoList([...todos].filter((todo) => todo.status === 0));
        setDoingList([...todos].filter((todo) => todo.status === 1));
        setDoneList([...todos].filter((todo) => todo.status === 2));
        setEditMode(false);
    }, [todos]);

    useEffect(() => {
        setEditMode(true);
        setNewTitle(todoToEdit.title);
        setNewContent(todoToEdit.content);
    }, [todoToEdit]);

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setNewContent(event.target.value);
    };

    const addNoteButton = (event) => {
        event.preventDefault();
        document.getElementById("new-note__window").style.display = "flex";
    };

    const cancelAddNote = (event) => {
        event.preventDefault();
        document.getElementById("new-note__window").style.display = "none";
        setEditMode(false);
        setNewTitle("");
        setNewContent("");
    };

    const saveNewNote = (event) => {
        event.preventDefault();
        const newTodo = { title: newTitle, content: newContent, status: 0 };
        todoService
            .create(newTodo)
            .then((response) => {
                setTodos([...todos].concat(response));
                setNewTitle("");
                setNewContent("");
                document.getElementById("new-note__window").style.display =
                    "none";
                showToast("👍 Success");
            })
            .catch((error) => {
                console.log("error", error);
                showToast("👎 Failed");
            });
    };

    const deleteNote = (event) => {
        event.preventDefault();
        const targetId = event.target.id;
        todoService
            .remove(targetId)
            .then((response) => {
                showToast("👍 Success");
                const newTodos = [...todos].filter(
                    (todo) => todo.id !== targetId
                );
                setTodos([...newTodos]);
            })
            .catch((error) => {
                console.log("error", error);
                showToast("👎 Failed");
            });
    };

    const editNote = (event) => {
        event.preventDefault();
        const id = event.target.id;
        setTodoToEdit([...todos].find((todo) => todo.id === id));
        document.getElementById("new-note__window").style.display = "flex";
    };

    const moveNoteRight = (event) => {
        event.preventDefault();
        const targetId = event.target.id;
        const todoToUpdate = todos.find((todo) => todo.id === targetId);
        const newStatus = todoToUpdate.status + 1;
        const updatedTodo = { ...todoToUpdate, status: newStatus };
        todoService
            .update(updatedTodo.id, updatedTodo)
            .then((response) => {
                setTodos(
                    [...todos].map((todo) =>
                        todo.id !== updatedTodo.id ? todo : updatedTodo
                    )
                );
                showToast("👍 Success");
            })
            .catch((error) => {
                console.log("error", error);
                showToast("👎  Failed");
            });
    };

    const moveNoteLeft = (event) => {
        event.preventDefault();
        const targetId = event.target.id;
        const todoToUpdate = todos.find((todo) => todo.id === targetId);
        const newStatus = todoToUpdate.status - 1;
        const updatedTodo = { ...todoToUpdate, status: newStatus };
        todoService
            .update(updatedTodo.id, updatedTodo)
            .then((response) => {
                setTodos(
                    [...todos].map((todo) =>
                        todo.id !== updatedTodo.id ? todo : updatedTodo
                    )
                );
                showToast("👍 Success");
            })
            .catch((error) => {
                console.log("error", error);
                showToast("👎  Failed");
            });
    };

    const showToast = (message) => {
        setNotification(message);
        document.getElementById("toast-notification").style.display = "flex";
        setTimeout(() => {
            document.getElementById("toast-notification").style.display =
                "none";
        }, 5000);
    };

    const saveEditedNote = (event) => {
        event.preventDefault();
        const updatedTodo = {
            ...todoToEdit,
            title: newTitle,
            content: newContent,
        };
        todoService
            .update(todoToEdit.id, updatedTodo)
            .then((response) => {
                setTodos(
                    [...todos].map((todo) =>
                        todo.id !== updatedTodo.id ? todo : updatedTodo
                    )
                );
                setEditMode(false);
                document.getElementById("new-note__window").style.display =
                    "none";
                showToast("👍 Success");
            })
            .catch((error) => {
                console.log("error", error);
                showToast("👎  Failed");
            });
    };

    return (
        <div>
            <div className="App">
                <Header />
                <NewNoteForm
                    titleValue={newTitle || ""}
                    contentValue={newContent}
                    onCancel={cancelAddNote}
                    onTitleChange={handleTitleChange}
                    onContentChange={handleContentChange}
                    onSave={saveNewNote}
                    editMode={editMode}
                    onEdit={saveEditedNote}
                />
                <ToastNotification message={notification} />
                <div className="lists-container">
                    <List
                        todos={doList}
                        title="do"
                        onAdd={addNoteButton}
                        onDelete={deleteNote}
                        onMoveRight={moveNoteRight}
                        onEdit={editNote}
                    />
                    <List
                        todos={doingList}
                        title="doing"
                        onMoveRight={moveNoteRight}
                        onMoveLeft={moveNoteLeft}
                        onDelete={deleteNote}
                        onEdit={editNote}
                    />
                    <List
                        todos={doneList}
                        title="done"
                        onMoveLeft={moveNoteLeft}
                        onDelete={deleteNote}
                        onEdit={editNote}
                    />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
