const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Call express
const app = express() 
//path.join return final path
const publicDirectoryPath = path.join(__dirname, '../public')
//Customize views path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000;


//app.set -> a value for a given express setting
//setup handlebars engine and views location 
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)


//way to customize server, setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Robert R'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Robert R'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Robert R'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 

    
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                lat,
                long,
                location,
                address: req.query.address
            })
        })
    })





})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)

    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        helpMessage: 'Help article not found',
        name: 'Robby R'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 error page',
        name: 'Robby R'
    })
})

app.listen(3000, () => {
    console.log(' 🌎 Listening on localhost:3000')
})
