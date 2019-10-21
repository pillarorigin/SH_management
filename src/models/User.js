class User{
    constructor(userId, name, password, role, date){
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.role = role;
        this.date = date;
    }

    static newInstance(userId, name, password, role){
        const date = `${Date.now()}`;
        return new User(userId, name, password, role, date);
    };

    toJSON(){
        return {
            userId: this.userId,
            name: this.name,
            password: this.password,
            role: this.role,
            date: this.date
        }
    };

    static fromData(data){
        return new User(data.userId, data.name, data.password, data.role, data.date);
    }

}