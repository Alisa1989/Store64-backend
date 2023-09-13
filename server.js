const express = require("express");
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const productsRouter = require("./products/products-router")
const customersRouter = require("./customers/customers-router")
const cartsRouter = require("./carts/carts-router")
const sellersRouter = require("./sellers/sellers-router")
const sellersInventoryRouter = require("./sellersInventory/sellersInv-Router")
const db = require("./data/config")

const server = express();
//to serve static files so images can be refereneced
server.use(express.static('data'));

//This gets rid of cors error message so i can send request from a localhost to another
// credentials: true allows the cookie to be read
var cors = require('cors');
// server.use(cors({origin: 'http://localhost:3000', credentials: true}));
// server.use(cors({origin: '*', credentials: true}));

server.use(cors())

// The default express max request limit is 100kb, increase it
const maxRequestBodySize = '3mb';
server.use(express.json({limit: maxRequestBodySize}));
// server.use(express.urlencoded({limit: maxRequestBodySize}));
//extended config object key now needs to be explicitly passed
server.use(express.urlencoded({ extended: true, limit: maxRequestBodySize }));

server.use(express.json())
server.use(session({
	resave: false, //avoids creating sessions that haven't changed
	saveUninitialized: false, // GDPR laws against setting cookies automatically
	secret: "keep it secret, keep it safe", // used to cryptographically sign the cookie
	// store the session data in the database rather than in memory
	store: new KnexSessionStore({
		knex: db, // pass configured instance of knex
		createtable: true, // if the session table does not exist, it will create it automatically
	}),
	
}))

server.use(productsRouter)
server.use(customersRouter)
server.use(cartsRouter)
server.use(sellersRouter)
server.use(sellersInventoryRouter)

server.get("/", (req, res) => {
    res.json({message: "Store64 API"})
})

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong, please try again later"
    })
})

module.exports = server
