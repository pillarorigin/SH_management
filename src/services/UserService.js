const UserRepository = require('../database/repositories/UserRepository')
const User = require('../models/User')

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }


    find(){
        const usersData = this.userRepository.find();
        console.log("userData !!@!@!@!@@ ", usersData )
        console.log("211312124", typeof(usersData))
        
        return usersData;
    }
}

module.exports = UserService;