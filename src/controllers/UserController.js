const UserService = require('../services/UserService');


const getUsers = (req, res) =>{
    const userService = new UserService();
    const users = userService.find();
    console.log(typeof(users))
    res.send({
        data: users
    })
}


module.exports = {
    getUsers
}