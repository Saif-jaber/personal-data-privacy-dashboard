import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // .env file usage
import pool from './db.js';
import bcrypt from "bcrypt";
import User from './models/users.js';
import Log from './models/logs.js';


dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());

// all routes below

app.post("/signup", async (req, res)=>{  //sign up route
    try {
        const { email, password } = req.body;

        //check inputs if they are missing
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const userExists = await User.findEmail(email);
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        //create the user
        await User.createUser(email, password);
        res.status(201).json({ message: "User created successfully" }); //success message if user gets created
        await Log.createLog(email); // creates a log for the user that signed up first cuz they will be redirected
        
    } catch (err) {
        console.log("error connecting to database :" +err);
    }
});

//login
app.post("/login", async (req, res)=>{
    try {
        const { email, password } = req.body;
    
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        else{
            const user = await User.findUser(email, password);
            console.log("User from DB:", user);

            if(user === null){ // if login is not successfull
                return res.status(401).json({ message: "Invalid email or password" });
            }
            else{ // if login is successfull
                res.status(200).json({ message: "Login successful", user });
                await Log.createLog(email); // creates a log for the user that logged in
            }
        }
        
    } catch (err) {
        console.log("error connecting to database :" +err);
    }
})

//oauth login

//delete account 


app.listen(port, ()=>{
    console.log('server has started on port ' + port);
});

