const router = require("express").Router();
let Student = require("../models/student");

//create 

router.route("/create").post((req,res)=>{

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })

    newStudent.save().then(()=>{
        res.json("student added successfull");
    }).catch((error) =>{
        console.log("error");
    })


})

//read
router.route("/read").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students);

    }).catch((err)=>{
        console.log(err);

    })

})

//update

router.route("/update/:id").put(async (req , res) =>{
    let userId = req.params.id;
    const {name,age,gender} = req.body;

    if (!name || !age || !gender) {
        return res.status(400).send({ status: "Incomplete data provided. Please provide name, age, and gender." });
    }

    const updateStudent ={
        name,
        age,
        gender
    };
    
    const update = await Student.findByIdAndUpdate(userId,updateStudent).then(()=>{
        res.status(200).send({status: "user updated" });
    }).catch((err)=>{
        res.status(500).send({status: "error updating"});
    })

    
})

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    
    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err);
    })

})

//fatch one user data 
router.route("/getuser/:id").get(async(req,res)=>{
    let userId = req.params.id;

    const user = await Student.findById(userId).then((student)=>{
        res.status(200).send({status: "user fatched",student })

    }).catch((err)=>{
        console.log(err)

    })
})


module.exports = router;
