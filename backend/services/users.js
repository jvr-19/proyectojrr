const db = require('./db')
const helper = require('../helper')
const config = require('../config')
//Función con la consulta para insertar datos en la base de datos: INSERT
async function insertUser(req, res) {

    const data = req.query
    const result = await db.query(`INSERT INTO usuarios (nombre, login, password, rol) VALUES ('${data.nombre}', '${data.login}', '${data.password}', '${data.rol}')`)

    return result.affectedRows
}
//Función con la consulta de obtener datos de la base de datos: select * from coleccion
async function getUser(req, res) {
    const rows = await db.query(`SELECT * from usuarios`)

    const data = helper.emptyOrRows(rows)
    return {
        //Devolvemos el resultado del Select, que está almacenado en la variable data
        data
    }
}

//Al final del fichero exporto las funciones getData, insertData y deleteData
module.exports = {
    getUser,
    insertUser
}
