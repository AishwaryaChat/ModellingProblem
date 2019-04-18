const fs = require("fs");

const db = require("../../models/index");

module.exports = (req, res) => {
  const id = req.params.id;
  const cabs = db.cabs;
  const recordIndex = cabs.findIndex(cab => cab.id === id);
  if (recordIndex !== -1) {
    const body = req.body;
    let existingData = cabs[recordIndex];
    let newData = {
      ...existingData,
      ...body,
      id
    };
    cabs[recordIndex] = newData
      fs.writeFile(__dirname + "/../../models/index.json", JSON.stringify(db, null, 2), (err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            res.status(201).send({ data: newData });
          }
      } )
  } else {
    res.status(400).send(new Error("error record not found"));
  }
};
