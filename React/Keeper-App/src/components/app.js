import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import CreateArea from "./createarea";

function App() {
    const [notes, setNotes] = useState([]);
    
    function addNote(note) {
        setNotes(prevNotes => {
            return [...prevNotes, note];
        })
    };

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((note, index) => {
                return index !== id;
            });
        });
    };
    
    return <div>
        <Header />
        <CreateArea 
            onAdd={addNote}
        />
        {notes.map((noteItem, index) => 
                <Note
                    key={index}
                    id={index} 
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />
            )}
        <Footer />
    </div>
};

export default App;

