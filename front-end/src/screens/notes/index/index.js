import { Column } from 'rbx';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header';
import Editor from '../../../components/notes/editor';
import SideBar from '../../../components/notes/sidebar';
import NotesService from '../../../services/notes';
import '../../../styles/notes.scss'


const Notes = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [notes, setNotes] = useState([])
    const [currentNote, setCurrentNote] = useState({
        title: '',
        body: '',
        id: ''
    })


    async function getNotes() {
        const response = await NotesService.index()
        if (response.data.length >= 1) {
            setNotes(response.data.reverse())
            setCurrentNote(response.data[0])
            return true
        }

        setNotes([])
        return true
    }

    async function createNote() {
        await NotesService.create();
        getNotes()
    }

    async function deleteNote(id) {
        await NotesService.delete(id)
        getNotes()
    }

    async function updateNote(note, params) {
        const updatedNote = await NotesService.update(note._id, params)
        const index = notes.indexOf(note)
        const newNotes = notes
        newNotes[index] = updatedNote.data
        setNotes(newNotes)
        setCurrentNote(updatedNote.data)
    }

    async function searchNotes(query) {
        const response = await NotesService.search(query)
        setNotes(response.data)
    }

    const selectNote = (id) => {
        const note = notes.find((note) => note._id === id)
        setCurrentNote(note)
    }


    useEffect(() => {
        getNotes()
    }, []);


    return (
        <>
            <Header setIsOpen={setIsOpen} />
            <Column.Group className="notes" id="notes">
                <SideBar setIsOpen={setIsOpen} isOpen={isOpen} notes={notes} selectNote={selectNote} currentNote={currentNote} createNote={createNote} deleteNote={deleteNote} searchNotes={searchNotes} getNotes={getNotes} />
                <Column size={12} className="notes-editor" id="notes-editor">
                    <Editor note={currentNote} updateNote={updateNote} />
                </Column>
            </Column.Group>
        </>
    )
}

export default Notes;