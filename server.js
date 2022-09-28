const express = require('express')
const mongoose = require('mongoose')
const shorturl = require('./urlShortner/models/shortURL')
const app = express()

mongoose.connect("mongodb://localhost", {useNewUrlParser:true, useUnifiedTopology: true})


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    const shortUrls = await shorturl.find()
    res.render('index', {short:shortUrls})
})

app.post("/shortURLs", async (req, res) => {
    await shorturl.create({full: req.body.fullurl})
    res.redirect('/')
})

app.get('/:shorturl', async (req, res) => {
    const short_url = await shorturl.findOne({short: req.params.shorturl})
    if(short_url == null) return res.status(404).sendmessage("Oops, no URL specified!")
    short_url.clicks++
    short_url.save()

    res.redirect(short_url.full)
})

























app.listen(5500)
