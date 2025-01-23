const user = [];

module.exports = class User{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    save(){
        users.push(this);
    }
    static getALL(){
        return users;
    }
}