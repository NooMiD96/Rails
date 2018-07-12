import fs from "fs";

export const init = function(app) {
  app.get(`/`, (request, response) => {
    fs.readFile(`./server/dist/index.html`, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      response.send(data);
    });
  });
}


