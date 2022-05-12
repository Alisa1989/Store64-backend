const server = require("./server")

const port = process.env.port || 4000;

server.listen(port, () => {
    console.log("server started")
})
