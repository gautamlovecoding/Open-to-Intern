const intern = require("../models/internModel");
const college = require("../models/collegeModel")

const createIntern = async function (req, res) {
    try {
        let data = req.body;

        /*****************************Validation***********************************************/
        if (!Object.keys(data).length)
            return res.status(400).send({ status: false, message: "You must enter data" })

        if (!data.collegeName) return res.status(400).send({ status: false, message: "You must Give college name" })

        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })
        if (!data.name.trim().match(/^[a-zA-Z,\s]*$/)) // REGEX using .match()
            return res.status(400).send({ status: false, msg: "Enter a valid name." })

        let findCollege = await college.findOne({ name: data.collegeName })

        if (!findCollege) res.status(404).send({ status: false, message: "Document not Found" })
        /*************************************************************************************/

        delete data.collegeName
        data.collegeId = findCollege._id
        let created = await intern.create(data)
        res.status(201).send({ status: true, data: created })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = createIntern;