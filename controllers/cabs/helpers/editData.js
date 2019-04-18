const fs = require("fs");

const db = require("../../../models/index");

module.exports = ({ id, body }) => {
  return new Promise((resolve, reject) => {
    const cabs = db.cabs;
    const recordIndex = cabs.findIndex(cab => cab.id === id);
    if (recordIndex !== -1) {
      let existingData = cabs[recordIndex];
      let newData = {
        ...existingData,
        ...body,
        id
      };
      cabs[recordIndex] = newData;
      fs.writeFile(
        __dirname + "/../../../models/index.json",
        JSON.stringify(db, null, 2),
        err => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(newData);
          }
        }
      );
    } else {
      reject("Data not found");
    }
  });
};
