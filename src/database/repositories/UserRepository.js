const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository{
    constructor(){
        super('users')
    }
}

module.exports = UserRepository