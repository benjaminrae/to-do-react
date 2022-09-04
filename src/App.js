import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
// import Footer from "./Components/Footer/Footer";
import NewNoteForm from "./Components/NewNoteForm/NewNoteForm";
import todoService from "./services/todos";
import ToastNotification from "./Components/ToastNotification/ToastNotification";
// import Login from "./Components/Login/Login";
// import { signIn } from "./services/firebase";

function App() {
    const [todos, setTodos] = useState([
        { title: "test note", content: "", status: 0 },
    ]);
    const [doList, setDoList] = useState([]);
    const [doingList, setDoingList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    // const [notification, setNotification] = useState({ id: 0 });
    const [notificationList, setNotificationList] = useState([]);
    const [toastId, setToastId] = useState(0);
    const [todoToEdit, setTodoToEdit] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        todoService.getAll().then((response) => {
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

    const deleteToast = (id) => {
        const updatedNotifications = [...notificationList].filter(
            (notification) => {
                return id !== notification.id;
            }
        );
        setNotificationList(updatedNotifications);
    };

    const handleToastCancel = (event) => {
        event.preventDefault();
        const targetId = +event.target.id;
        deleteToast(targetId);
    };

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
                showToast("👎  Failed");
            });
    };

    const showToast = (message) => {
        const maxId =
            notificationList.length > 0
                ? Math.max(
                      ...notificationList.map((notification) => notification.id)
                  )
                : 0;
        setToastId(maxId + 1);
        setNotificationList(
            [...notificationList].concat({
                message: message,
                id: maxId + 1,
            })
        );
        // autoDeleteToast(maxId);
    };

    // const autoDeleteToast = (id) => {
    //     setTimeout(() => {
    //         deleteToast(id);
    //     }, 5000);
    // };

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
                showToast("👎  Failed");
            });
    };

    const handleCarouselButton = (event) => {
        event.preventDefault();
        let newIndex = +event.target.value;
        setCarouselIndex(newIndex);
    };

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--carousel-index",
            `-${carouselIndex * 100}%`
        );
    }, [carouselIndex]);

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
                <ToastNotification
                    toastList={notificationList}
                    onCancel={handleToastCancel}
                />
                {/* <Login /> */}
                <div className="carousel-outer">
                    <div className="lists-container carousel-inner">
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
                    <div className="carousel-buttons">
                        <button
                            value="0"
                            onClick={handleCarouselButton}
                            className="carousel-buttons__button"
                        >
                            do
                        </button>
                        <button
                            value="1"
                            onClick={handleCarouselButton}
                            className="carousel-buttons__button"
                        >
                            doing
                        </button>
                        <button
                            value="2"
                            onClick={handleCarouselButton}
                            className="carousel-buttons__button"
                        >
                            done
                        </button>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
