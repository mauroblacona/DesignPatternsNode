const express = require('express');
const parser = require('body-parser')
//Patron singleton, se declaran todos los servicios del backend en el directorio 'services'
const services = require('./services')
const handlify = require('./handlers');


const usersHandlers = handlify('users')
const postsHandlers = handlify('posts')

const app = express()

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

const port = 3000

app.get('/', usersHandlers(services).get)
app.post('/', usersHandlers(services).post)
app.put('/:id', usersHandlers(services).put)
app.delete('/:id', usersHandlers(services).delete)

app.get('/posts', postsHandlers(services).get)
app.post('/posts', postsHandlers(services).post)
app.put('/posts/:id', postsHandlers(services).put)
app.delete('/posts/:id', postsHandlers(services).delete)

app.listen(port, () => console.log(`Listening on port ${port}!`))