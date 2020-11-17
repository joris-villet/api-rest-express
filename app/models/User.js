const db = require('../db');

module.exports = class User {

        static async findAll() {
            const result = await db.query(`SELECT * FROM api_user;`);
            return result.rows;
        }

        static async findOne(id) {
            const result = await db.query(`SELECT * FROM api_user WHERE id = $1;`, [id]);
            return result.rows[0];
        }

        static async create(newUser) {
            const result = await db.query(`SELECT * FROM new_user($1);`,[newUser]);
            return newUser.id = result.rows[0].id;
        }

        static async update(existingUser) {
            
            const result = await db.query(`SELECT * FROM edit_user($1);`, [existingUser]);
            return result.rows[0].id;
        }

        static async delete(targetUserId) {
            await db.query(`SELECT delete_user($1);`, [targetUserId]);
            return true;
        }
}