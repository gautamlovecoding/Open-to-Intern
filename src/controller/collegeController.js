const college = require("../models/collegeModel");

const createCollege = async function(req, res){
    /*****************************ValiDation****************************/
    try{ 
        let data = req.body;
    if(!Object.keys(data).length)
    return res.status(400).send({status: false, message: "You must enter data"})

    if(!data.name.trim().match(/^[a-zA-Z]+$/)) // REGEX using .match()
     return res.status(400).send({status: false, msg: "Enter a valid name."})

     if(!data.fullName.trim().match(/^[a-zA-Z]+$/)) // REGEX using .match()
     return res.status(400).send({status: false, msg: "Enter a valid full name."})

    let created = await college.create(data)
    res.status(201).send({status: true, data: created})
}
catch(err){
    console.log(err.message)
    res.status(500).send({status: false, msg: err.message})
}

}

module.exports = createCollege;