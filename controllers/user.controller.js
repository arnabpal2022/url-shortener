const { nanoid } = require("nanoid");
const { URL } = require('../models/user.model')
async function handleGenerateShortURL (req, res) {
    const body = req.body
    const shortID = nanoid(8)
    if(!body.url) return res.status(400).send('URL is required')

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render('home', {
        id:shortID,
    })
}

module.exports = {handleGenerateShortURL}