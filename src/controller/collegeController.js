const college = require("../models/collegeModel");
const intern = require("../models/internModel");

const createCollege = async function (req, res) {
    /*****************************Validation***********************************************/
    try {
        let data = req.body;
        if (!Object.keys(data).length)
            return res.status(400).send({ status: false, message: "You must enter data" })

        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })
        if (!data.name.trim().match(/^[a-zA-Z]+$/)) 
        return res.status(400).send({ status: false, msg: "Enter a valid name."})

        let checkName = await college.findOne({name: data.name})
        if(checkName) return res.status(400).send({status: false, message: "This college is already registered"})

        if (!data.fullName) return res.status(400).send({ status: false, message: "You must enter full name" })
        if (!data.fullName.trim().match(/^[a-zA-Z,\-.\s]*$/))
            return res.status(400).send({ status: false, msg: "Enter a valid full name." })

        if (!data.logoLink) return res.status(400).send({ status: false, message: "You must enter logoLink"})
        if (!data.logoLink.trim().match(/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)$/))
            return res.status(400).send({ status: false, msg: "Enter a valid logo link" })

        /*************************************************************************************/

        let created = await college.create(data)
        res.status(201).send({ status: true, data: created })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }

}


const getCollege = async function (req, res) {
    let getData = req.query
    /*****************************Validation*****************************************************************/
    if (!getData.collegeName) return res.status(400).send({ status: false, message: "You must enter your College Name" })
    let findCollege = await college.findOne({ name: getData.collegeName })
    // console.log(findCollege);
    if (!findCollege) return res.status(404).send({ status: false, message: "Your college is not registered with us." })
    /*******************************************************************************************************/
    let collegeId = findCollege._id
    let findIntern = await intern.find({ collegeId: collegeId, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

    return res.status(200).send({
        status: true,
        data: {
            "name": findCollege.name,
            "fullName": findCollege.fullName,
            "logoLink": findCollege.logoLink,
            "interests": findIntern
        }
    })
}

module.exports.createCollege = createCollege;
module.exports.getCollege = getCollege;