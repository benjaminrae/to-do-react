import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Footer from "./Components/Footer/Footer";

const doing = [{}];

const done = [{}];

function App() {
    const [notes, setNotes] = useState([
        {
            title: "note 1",
            content: "This is a note",
            id: 1,
            time: "",
            status: 0,
        },
        {
            title: "note 2",
            content: "This is a note",
            id: 2,
            time: "",
            status: 0,
        },
        {
            title: "note 3",
            content: "This is a note",
            id: 3,
            time: "",
            status: 0,
        },
        {
            title: "note 4",
            content: "This is a note",
            id: 4,
            time: "",
            status: 0,
        },
        {
            title: "note 5",
            content: "This is a note",
            id: 5,
            time: "",
            status: 0,
        },
    ]);
    const [newNote, setNewNote] = useState({});

    const addNote = (event) => {
        event.preventDefault();
        const noteTitle = window.prompt("What's the title of your note?");
        const noteContent = window.prompt("What's the content of your note?");
        setNotes([
            ...notes,
            { title: noteTitle, content: noteContent, status: 0 },
        ]);
        console.log("addnote");
    };

    return (
        <div className="App">
            <Header />
            <div className="lists-container">
                <List notes={notes} title="do" onAdd={addNote} />
                <List notes={doing} title="doing" />
                <List notes={done} title="done" />
            </div>

            <Footer />
        </div>
    );
}

export default App;
