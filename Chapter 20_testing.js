const {createServer} = require("http");
const {parse} = require("url");
const {resolve, sep} = require("path");
const {createReadStream, createWriteStream} = require("fs");
const {stat, readdir, rmdir, unlink} = require("fs").promises;
const mime = require("mime");
const baseDirectory = process.cwd();
methods = Object.create(null);

createServer((req, res) =>{
    let handler = methods[req.method] || notAllowed;
    handler(req)
        .catch(error =>{
            if(error.status != null) return error;
            return {body: String(error), status: 500};
        })
        .then(({body, status = 200, type = "text/plain"}) =>{
            res.writeHead(status, {"Content-Type": type});
            if(body && body.pipe){
                body.pipe(res)
            }else{
                res.end(body);
            }
        });
}).listen(8000);

async function notAllowed(req){
    return{
        status: 405,
        body: `Method ${req.method} not allowed.`
    };
}

urlPath = function(url){
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if(path != baseDirectory && !path.startsWith(baseDirectory + sep)){
        throw {status: 403, body:"Forbidden"};
    };
    return path;
}

methods.GET = async function(req){
    let path = urlPath(req.url);
    let stats;
    try{
        stats = await stat(path);
    }catch(error){
        if(error.code != "ENOENT") throw error;
        else return {status: 404, body: "File not found"};
    }
    if(stats.isDirectory()){
        return {body: (await readdir(path)).join("\n")};
    }else{
        return {body: createReadStream(path),
                type: mime.getType(path)};
    }
};

methods.DELETE = async function(req){
    let path = urlPath(req.url);
    let stats;
    try{
        stats = await stat(path);
    }catch(error){
        if(error.code != "ENOENT") throw error;
        else return {status: 204};
    }
    if(stats.isDirectory()) await rmdir(path);
    else await unlink(path);
    return {status: 204};
}

function pipeStream(from, to) {
    return new Promise((resolve, reject) =>{
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function(req){
    let path = urlPath(req.url);
    await pipeStream(req, createWriteStream(path));
    return{status:204};
}

module.exports.methods = methods;
module.exports.stat = stat;


// let {readFile} = require("fs").promises;
// let {writeFile} = require("fs");
// const { request } = require("http");

// let requestStream = request({
//     hostname: "eloquentjavascript.net",
//     path: "/20_node.html",
//     method: "GET",
//     headers: {Accept: "text/html"}
// }, response =>{
//     console.log("Server responded with status code ", response.statusCode)
// });

// requestStream.end();

// let server = createServer((req, res) =>{
//     res.writeHead(200, {"Content-type": "text/html"});
//     req.on("data", chunk => res.write(chunk.toString().toUpperCase()));
//     req.on("end", () => res.end());
// });

// server.listen(8000);
// console.log("Listening! (port 8000)")

// readFile("file.txt", "utf8")
//     .then(text => console.log("The file contains:", text));

// writeFile("grafitti.txt", "Node was here", err =>{
//     if(err) console.log(`Failed to write file ${err}`);
//     else console.log("File written");
// })

