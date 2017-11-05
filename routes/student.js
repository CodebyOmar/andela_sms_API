const admin = require('firebase-admin')
      ,router = require('express').Router();

/* db settings */
const db  = admin.database()
const ref = db.refFromURL("https://andela-sms.firebaseio.com")

router.post("/new", ( req, res ) => {  

  try {
    let id = req.body.regnum
    id = id.toLowerCase()
    ,studentRef = ref.child("students/"+id)

    studentRef.set( {
      'first_name':req.body.fname,
      'last_name':req.body.lname,
      'd_o_b':req.body.dob,
      'course_of_study':req.body.cos,
      'faculty':req.body.faculty,
      'department':req.body.department,
      'reg_num':req.body.regnum,
      'level':req.body.level
    })

    res.json({'status':'success','data':id,'message':'Student created successfully.'})

  } catch (error) {
    if(error){
      res.json({'status':'error','data':null,'message':error.message})
    }
  }
  
})      

router.get("/getstudent/:regnum", (req,res)=>{
  let regnum = req.params.regnum

  return ref.child('students/' + regnum).once('value')
  .then(function(snapshot) {
    if(snapshot !== null) {
      res.json({'status':'success', 'data':snapshot.val(),'message':'student retrieved.'})
    }else{
      res.json({'status':'error','data':snapshot.val(),'message':'student not found'})
    }
  });
})

router.get("/getstudents", (req,res) => {
  return ref.child('students/').once('value')
  .then((snapshot) => {
    if(snapshot !== null) {
      res.json({'status':'success', 'data':snapshot.val(),'message':'students retrieved.'})
    }else{
      res.json({'status':'error','data':snapshot.val(),'message':'students not found'})
    }
  })
  .catch((error) => {
    res.json({"status":"error","data":null,'message':error})
  })
})

router.put("/edit/details/:regnum", (req,res)=>{
  let regnum = req.params.regnum
  
  try {
    let studentRef = ref.child("students/"+regnum)

    studentRef.set( {
      'first_name':req.body.fname,
      'last_name':req.body.lname,
      'd_o_b':req.body.dob,
      'course_of_study':req.body.cos,
      'faculty':req.body.faculty,
      'department':req.body.department,
      'reg_num':req.body.regnum,
      'level':req.body.level
    })

    res.json({'status':'success','data':regnum,'message':'Student details edited.'})

  } catch (error) {
    if(error){
      res.json({'status':'error','data':null,'message':error.message})
    }
  }
})


router.delete("/delete/:regnum", (req,res) => {
  let regnum = req.params.regnum

  let studentRef = ref.child("students/"+regnum)
  return studentRef.remove()
  .then((response) => {
    res.json({'status':'success','data':response,'message':'Student deleted successfully.'})
  })
  .catch((error) => {
    res.json({'status':'error','data':null,'message':error.message})
  })
})

module.exports = router;