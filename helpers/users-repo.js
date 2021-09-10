const fs = require('fs')

let users = require('../database.json')

export const usersRepo = {
    getAll: () => users,
    getById: id => users.find(x => x.id.toString() === id.toString()),
    find: x => users.find(x),
    create,
    update,
    delete: _delete
}

function create(user){
    user.id = users.lenght ? Math.max(...users.map(x => x.id)) + 1 : 1

    user.dataCreated = new Date().toISOString()
    user.dataUpdated = new Date().toISOString()

    users.push(user)
    saveData()
}

function update(id, params){
    const user = users.find(x => x.id.toString() === id.toString())

    user.dataUpdated = new Date().toISOString()

    object.assign(user, params)
    saveData()
}
function _delete(id){
    users = users.filter(x => x.id.toString() !== id.toString())
    saveData()
}

function saveData(){
    fs.writeFileSync('../database.json', JSON.stringify(users, null, 4))
}