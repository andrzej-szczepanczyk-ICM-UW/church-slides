// const http = require('http');
const fs = require("fs");
const path = require("path");
const express = require("express");
const redisServer = require("redis");
const app = express();
//password scalegrid - ScaleGrid007!

//presentation part
let PptxGenJS = require("pptxgenjs");
let slides = new PptxGenJS();
slides.layout({ bkgd: "36ABFF", color: "36ABFF" });
slides.save();

let SLIDE_MASTER_SETTINGS = {
  title: "settings",
  title: "Niedziela 2018-04-04",
  bkgd: "36ABFF",
  objects: [
    {
      placeholder: {
        options: {
          name: "name",
          type: "body",
        },
      },
    },
  ],
};

text1 = "Duchu przyjdź";
text2 = "Boże westchnij o nas";
options = {
  w: "100%",
  h: "80%",
  fill: "009920",
  bkgd: "F0000",
  color: "FFFFFF",
  fontSize: 24,
};

one_slide = slides.addSlide("Piosenka o Duchu");
one_slide.addText(text1, options);
second_slide = slides.addSlide("Westchnienia miłosne");
second_slide.addText(text2, options);

slides.writeFile("12-04-2020");

const client = redisServer.createClient({
  host: "SG-slidesgenerator-32679.servers.mongodirector.com",
  port: 6379,
  password: "lTycnfuO7PFtx69k3ObyEsTfizlZy9JF",
});

app.use(express.static("assets"));

app.get("/songs", (req, res) => {
  client.get("songs", (x, values) => {
    // res.writeHead(status_ok, {'Content-Type': mimetypes.html});
    res.write(JSON.stringify(values));
    res.end();
  });
});

app.get("/debug", (req, res) => {
  const serve = (values) => {
    // [[key, value]]
    res.write(JSON.stringify(values));
    res.end();
  };

  const getValues = (keys) => {
    const promises = [];
    keys.forEach((key) => {
      const promise = new Promise((resolve) => {
        client.get(key, (_, value) => {
          resolve([key, value]);
        });
      });
      promises.push(promise);
    });

    Promise.all(promises).then(serve);
  };

  client.keys("*", (_, keys) => {
    getValues(keys);
  });
});

client.on("error", function (error) {
  console.error(error);
});

client.keys("*", function (err, res) {
  console.log(res);
});

app.post("/songs", (req, res) => {
  client.set;
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "page.html"));
});

app.listen(3000, () => {
  console.log("Hey! Server is running");
});

// const mimetypes = {
//   'html': 'text/html',
//   'css': 'text/css',
//   'js': 'text/javascript',
//   'png': 'image/png',
//   'jpeg': 'image/jpeg',
//   'jpg': 'image/jpg'
// };

// const server = http.createServer((req, res) => {
//   console.log(req.url)
//   switch(req.url) {
//     case "/style.css": {
//       fs.readFile('./style.css', function(err, data){
//         res.writeHead(status_ok, {'Content-Type': mimetypes.css});
//         res.write(data);
//         res.end();
//       });
//     };
//     break;
//     default: {
//       fs.readFi'le('./page.html', function(err, data){
//         res.setHeader('Access-Control-Allow-Headers', '127.0.0.1');
//         res.writeHead(status_ok, {'Content-Type': mimetypes.html});
//         res.write(data);
//         res.end();
//       });
//     }
//   }
// });

// optional chaining

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// app.use('/assets', express.static(path.join(__dirname, "assets")));

// app.get('/style.css', (req, res) => {
//       fs.readFile('./assets/style.css', function(err, data){
//         res.writeHead(status_ok, {'Content-Type': mimetypes.css});
//         res.write(data);
//         res.end();
//       });
// });

//może byś spróbował to
//https://revealjs.com/#/fragments
//do wyświetlania prezentacyj ??? :)
//z www.education-ecosystem.com :0

// let data = '';
// let values = [];
// client.keys("*", )
// client.keys("*", async (x, values2) => {
//   values = values2
// })
// .then(() => {
//   return values.map(value => {
//     return client.get(value, (x, value) => {
//       data += value;
//     })
//   })
// })
// .then(Promise.all)
// .then(() => {
//   res.write(data);
//   res.end();
// });
// console.log("test")

// Promise.all
