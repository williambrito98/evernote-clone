import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

const Editor = (props) => {

    const [currentContent, setCurrentContent] = useState('')
    const [timer, setTimer] = useState('')


    useEffect(() => {
        setCurrentContent(props.note.body)
    }, [props.note])

    const updateNote = (content) => {
        const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30)
        props.updateNote(props.note, {
            title,
            body: content
        })
    }

    const handleChange = (content, delta, source) => {
        clearTimeout(timer)
        if (source === 'user') {
            setCurrentContent(content)
            setTimer(setTimeout(() => updateNote(content), 2000))
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ]
    }


    return (
        <ReactQuill theme="snow" value={currentContent} modules={modules} onChange={handleChange} />
    )
}

export default Editor;