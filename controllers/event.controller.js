const db = require('../models/index')
// access to our db through User and Role
const Event = db.event
const Calendar = db.calendar
const Comment = db.comment

// this will save event to the database
exports.saveEvent = (req, res) => {
    // we are going to make our user object using the params returned from req
    const event = new Event({
        id: req.body.id,
        name: req.body.name,
        date: req.body.date,
        location: req.body.location
    })

    // we save that user and if there is an error, we throw that error
    event.save((err, event) => {
        console.log("EVENT SAVED!!!!!")
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({
            id: event._id, 
            name: event.name,
            date: event.date,
            location: event.location,
            image: event.image
        })
    })
}

// this will show all events in the database
exports.seeEvents = (req, res) => {
    Event.find()
    .then((foundEvents)=>{
        res.send(foundEvents)
    })
}

// this will delete an event in the database
exports.deleteEvent = (req, res) => {
    Event.deleteOne({
        _id: req.body.id
    }).then(function(){ 
        console.log("Data deleted"); // Success 
        res.send({message: "Data Deleted"})
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
}









// This is will save and delete comment to the database 
exports.saveComment = (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        content: req.body.content,
       
    })

    // we save that user and if there is an error, we throw that error
    comment.save((err, event) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({ 
            name: comment.name,
            date: comment.date,
            
        })
    })
    Calendar.events.push(comment)
}

// this will show all comments in the database
exports.seeComments = (req, res) => {
    Comment.find()
    .then((foundComments)=>{
        res.send(foundComments)
    })
}

// this will delete an delete in the database
exports.deleteComment = (req, res) => {
    Comment.deleteOne({
        _id: req.body.id
    }).then(function(){ 
        console.log("Comment is deleted");  
        res.send({message: " Your comment has been Deleted"})
    }).catch(function(error){ 
        
    }); 
}