import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // .env file usage
import pool from "./db.js";
import bcrypt from "bcrypt";
import User from "./models/users.js";
import Log from "./models/logs.js";
import oAuth from "./models/oAuth.js";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());

// all routes below

app.post("/signup", async (req, res) => {
  //sign up route
  try {
    const { email, password } = req.body;

    //check inputs if they are missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userExists = await User.findEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create the user
    await User.createUser(email, password, "local");
    res.status(201).json({ message: "User created successfully" }); //success message if user gets created
    await Log.createLog(email); // creates a log for the user that signed up first cuz they will be redirected
  } catch (err) {
    console.log("error connecting to database :" + err);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    } else {
      const user = await User.findUser(email, password);
      console.log("User from DB:", user);

      if (user === null) {
        // if login is not successfull
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        // if login is successfull
        res.status(200).json({ message: "Login successful", user });
        await Log.createLog(email); // creates a log for the user that logged in
      }
    }
  } catch (err) {
    console.log("error connecting to database :" + err);
  }
});

//oauth signup + login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/auth/google/signup", async (req, res) => {
  // Route to handle Google signup
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "No credential provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    /*payload contains user info:
      payload.sub (unique Google ID)
      payload.email
      payload.name
      payload.picture*/

    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    const existingUser = await User.findEmail(user.email);

    if (!existingUser) {
      //create a user from oAuth
      await User.createUser(user.email, null, "google");
      await oAuth.createUserOAuth(user.email, "google", user.googleId); //create a oauth user 
      res.status(201).json({ message: "User created successfully usign oAuth" }); //success message if user gets created
  
      await Log.createLog(user.email); // creates a log for the user that signed up first cuz they will
    }
    
    else {
      await oAuth.checkOAuthUser(user.email, user.googleId);
      await Log.createLog(user.email); // creates a log for the user that signed up first cuz they will
      res.status(200).json({ message: "Login successful", user });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

app.post("/auth/google/login", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "No credential provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    await Log.checkUserTable(user.email);
    await oAuth.checkOAuthUser(user.email, user.googleId);
    await Log.createLog(user.email);

    // SEND RESPONSE
    return res.status(200).json({
      message: "Google login successful",
      user,
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid Google token" });
  }
});


//delete account

app.listen(port, () => {
  console.log("server has started on port " + port);
});
