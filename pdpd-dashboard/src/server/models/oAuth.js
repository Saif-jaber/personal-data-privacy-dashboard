import { use } from "react";
import pool from "../db.js";
import user from "./users.js";

const oAuth = {

    async createUserOAuth(email, provider, googleID){
        let userID;
        const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

        if(result.rows.length === 0){
            console.log("User not found");
            return;
        }
        else{
             userID = result.rows[0].id;
             await pool.query( `INSERT INTO oauth_accounts (user_id, provider, provider_user_id) VALUES ($1, $2, $3)
             RETURNING *`, [userID, provider, googleID]);
        }
       
    },

    async checkOAuthUser(email, googleID){
        //get user id
        const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
        let userID = result.rows[0].id;

        if(userID === null){ // user is not in DB
            return;
        }
        else{
            const inOAuthTable = await pool.query("SELECT EXISTS (SELECT 1 FROM oauth_accounts WHERE user_id = $1)", [userID]);
            
            if(inOAuthTable.rows[0].exists){ // if user in DB
                return userID;
            }
 
            else{
                this.createUserOAuth(email, "google", googleID);
            }
        }

    }

}

export default oAuth;