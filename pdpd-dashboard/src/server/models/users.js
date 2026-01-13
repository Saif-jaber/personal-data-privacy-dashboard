import pool from "../db.js";
import bcrypt from "bcrypt";
import logs from "./logs.js";

const user = {

    //find user by email
    async findEmail(email){  // $1 place holer = email
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    },

    async findUser(email, password){ // for logging in 
        const user = await this.findEmail(email);
        console.log("User fetched by email:", user);
        
        if(!user){ // user not found 
            console.log("No user found with this email");
            return null;
        }
        else{
            const passwordMatch = await bcrypt.compare(password, user.password_hash);
            if(passwordMatch){ // if there is a match
                return user;
            }
            else{
                return null;
            }
        }
    },

    //user code generator
    generateUserCode(){
      const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
      return `U${randomNumber}`;
    }, 

    //create user to the database
    async createUser(email, password, auth_provider){
        let isexistingUser = await this.findEmail(email);
        if(isexistingUser){
            console.log("User already exists");
            return;
        }
        
        let hashedPassword;
        if(password){
           hashedPassword = await bcrypt.hash(password, 10); // hashing the password from user
        }

        // Generate a unique user code
        let user_code;
        let existingUser;
        do {
            user_code = this.generateUserCode();
            existingUser = await pool.query("SELECT * FROM users WHERE user_code = $1",[user_code]);

        } while (existingUser.rows.length > 0);

        // Insert new user into DB
        const result = await pool.query(
            `INSERT INTO users (user_code, email, password_hash, auth_provider)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [user_code, email, hashedPassword, auth_provider]
        );

    },

    async logUser(email, password){
        logs.createLog(email);

    }
}

export default user;