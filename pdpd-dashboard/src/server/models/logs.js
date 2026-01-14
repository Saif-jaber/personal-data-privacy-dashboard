import pool from '../db.js';

const logs = {

    async createLog(email){
        const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        if(result.rows.length === 0){
            console.log("User not found");
            return;
        }
        else{
            const user_id = result.rows[0].id;
            await pool.query("INSERT INTO logs (user_id) VALUES ($1)", [user_id]);
            console.log("Log created");
        }
    },

    async checkUserTable(email){
        const result = await pool.query("SELECT email FROM users WHERE email = $1", [email]);
        if(result.rows.length === 0){ //if user dont exist
            console.log("User not found");
            return true;
        }
        else{
            return false;
        }
    }
};

export default logs;