const path = require('path')
const express = require('express') 
const hbs = require('hbs')


//Call express
const app = express() 
//path.join return final path
const publicDirectoryPath = path.join(__dirname, '../public')
//Customize views path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

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
        name: 'Robby R'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Robby R'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Robby R'
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
