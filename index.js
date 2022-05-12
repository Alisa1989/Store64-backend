const server = require("./server")

const port = cross.env.port || 4000;

server.listen(port, () => {
    console.log("server started")
})
