import express from 'express'
import getWeather from './utils.js'
import path from 'path'
import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const index = path.join(__dirname+'/public/index.html')
const app = express()
const port = process.env.PORT || 3000
app.use('/public', express.static('public'));

app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {title: 'About Me'})
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: 'Help',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( {
            error: 'You must provide an address!'
        })
    }
    getWeather(req.query.address, (error, {description, temperature} = {}) => {
        if(error) {
            return res.send({error})
        }
        res.send({description, temperature})
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server running on port ' + port)
})

