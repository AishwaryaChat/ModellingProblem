const editCabData = require("./helpers/editData")

module.exports = async (req, res, next) => {
  try {
    const id = req.params.id;
    const editedData = await editCabData({id, body: req.body})
    res.status(200).send({data: editedData})
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
};
