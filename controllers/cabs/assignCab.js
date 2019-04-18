const fs = require("fs");

const db = require("../../models/index.json");
const { findDistance } = require("../../helpers");

module.exports = (req, res) => {
  let cabs = db.cabs;
  const { latitude, longitude, type } = req.params;
  if(latitude==="null" || longitude==="null") res.send(400).send("wrong latitude and longitude")
  else {
    let unassignedCabs = cabs.filter(cab => cab.assigned === "false");
    let nearestCabs = unassignedCabs
      .map(cab => {
        const dist = findDistance(
          Number(latitude),
          Number(longitude),
          Number(cab.latitude),
          Number(cab.longitude)
        );
        cab.dist = dist;
        return cab;
      })
      .filter(cab => {
        if (cab.dist < 5) return true;
        return false;
      });
    if (type !== "null") {
      nearestCabs = nearestCabs.filter(cab => cab.type === type);
    }
    nearestCabs.sort((a, b) => Number(a.dist) - Number(b.dist));
    if (nearestCabs.length > 0) {
      const nearestCab = nearestCabs[0];
      const dataIndex = cabs.findIndex(cab => cab.id === nearestCab.id);
      nearestCab.assigned = true;
      console.log("nearestCabs", nearestCabs);
      console.log("db", db);
      fs.writeFile(
        __dirname + "/../../models/index.json",
        JSON.stringify(db, null, 2),
        err => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            res.status(200).send(nearestCab);
          }
        }
      );
    } else {
      res.status(400).send(new Error("No cabs found"));
    }
  }
};
