const intern = require("../models/internModel");
const college = require("../models/collegeModel")

const createIntern = async function (req, res) {
    try {
        let data = req.body;

        /***************************** Validation ***********************************************/
        if (!Object.keys(data).length)
            return res.status(400).send({ status: false, message: "You must enter data" })

        if (!data.collegeName) return res.status(400).send({ status: false, message: "You must give college name" })

        if (!data.collegeName.trim().match(/^[a-zA-Z]+$/)) 
        return res.status(400).send({ status: false, msg: "Enter a valid college name." })
        
        let checkCollegeName = await college.findOne({name: data.collegeName})
        if(!checkCollegeName) return res.status(400).send({ status: false, message: "Your college is not registered with us." })

        if (!data.name) return res.status(400).send({ status: false, message: "You must enter name" })
        if (!data.name.trim().match(/^[a-zA-Z,\s]*$/)) // REGEX using .match()
            return res.status(400).send({ status: false, msg: "Enter a valid name." })

        if(!data.email) return res.status(400).send({ status: false, message: "You must give emailId" })  
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)))
        return res.status(400).send({status: false, msg: "Enter a valid email address."})

        let isRegisteredEmail = await intern.find({ email: data.email });
        if (isRegisteredEmail.length) return res.status(400).send({ status: false, message: "email id already registered" });
         
        if(!data.mobile.trim().match(/^(\+\d{1,3}[- ]?)?\d{10}$/))
        return res.status(400).send({status: false, msg: "Enter a valid mobile number"})

        let isRegisteredMobile = await intern.find({ mobile: data.mobile });
        if (isRegisteredMobile.length) return res.status(400).send({ status: false, msg: "mobile number already registered" });
        /****************************************************************************************/

        delete data.collegeName
        data.collegeId = checkCollegeName._id
        let created = await intern.create(data)
        res.status(201).send({ status: true, data: created })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = createIntern;