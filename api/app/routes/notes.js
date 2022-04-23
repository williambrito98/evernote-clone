const express = require('express');
const Note = require('../models/note');
const router = express.Router();
const withAuth = require('../middleware/auth')

router.post('/', withAuth, async (req, res) => {
    const { title, body } = req.body
    try {
        let note = new Note({ title, body, author: req.user._id })
        await note.save()
        return res.status(200).json(note)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error on create new note' })
    }
})

router.get('/', withAuth, async (req, res) => {
    try {
        let notes = await Note.find({ author: req.user._id })
        console.log(notes)
        return res.json(notes)
    } catch (error) {
        console.log(error)
        return req.status(500).json({ error })
    }
})


router.get('/search', withAuth, async (req, res) => {
    const { query } = req.query
    try {
        let notes = await Note.find({ author: req.user._id }).find({ 'title': { $regex: '.*' + query + '.*', $options: 'i' } })
        console.log(notes)
        return res.json(notes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Problem to get a note' })
    }
})

router.get('/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params
        let note = await Note.findById(id)
        if (isOwner(req.user, note)) {
            return res.json(note)
        }

        return res.status(403).json({ error: 'Permission Denied' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Problem to get a note' })
    }
})



router.put('/:id', withAuth, async (req, res) => {
    const { title, body } = req.body
    const { id } = req.params


    try {
        let note = await Note.findById(id)
        if (isOwner(req.user, note)) {
            await Note.
                updateOne({ _id: id }, { title: title, body: body, author: req.user._id })
            let note = await Note.findById(id)
            return res.json(note)
        }

        return res.status(403).json({ error: 'Permission Denied' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Problem to update a note' })
    }
})




router.delete('/:id', withAuth, async (req, res) => {
    const { id } = req.params

    try {
        let note = await Note.findById(id)

        if (isOwner(req.user, note)) {
            await note.delete()
            return res.json({ message: 'ok' }).status(204)
        }

        return res.status(403).json({ error: 'Permission Denied' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Problem to delete a note' })
    }
})


const isOwner = (user, note) => {
    if (JSON.stringify(user._id) === JSON.stringify(note.author._id)) return true
    return false
}


module.exports = router