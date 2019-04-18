const db = require("../../models/index.json");
const shortid = require("shortid");
const fs = require("fs");

module.exports = (req, res) => {
  const uniqueID = shortid.generate();
  const body = {
    id: uniqueID,
    ...req.body
  };
  db.cabs.push(body);
  fs.writeFile(
    __dirname + "/../../models/index.json",
    JSON.stringify(db, null, 2),
    "utf8",
    err => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(201).send({ data: body });
      }
    }
  );
};
