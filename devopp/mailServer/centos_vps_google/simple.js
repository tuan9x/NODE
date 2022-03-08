const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser

const server = new SMTPServer({
  onData(stream, session, callback) {
    parser(stream, {}, (err, parsed) => {
      if (err)
        console.log("Error:" , err)
      
      console.log(parsed)
      stream.on("end", callback)
    })
    
  },
  disabledCommands: ['AUTH']
});


console.log(">>>>> Server running at 25")
server.listen(25, "0.0.0.0")
