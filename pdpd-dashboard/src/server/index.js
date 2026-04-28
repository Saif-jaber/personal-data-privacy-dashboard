import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/users.js";
import Log from "./models/logs.js";
import oAuth from "./models/oAuth.js";
import { OAuth2Client } from "google-auth-library";
import securityQs from "./models/securityQs.js";
import Device from "./models/devices.js";

dotenv.config();

const app = express();
app.set("trust proxy", true);
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

// signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userExists = await User.findEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.createUser(email, password, "local");
    await Log.createLog(email);

    const createdUser = await User.findEmail(email);

    return res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (err) {
    console.log("error connecting to database :" + err);
    return res.status(500).json({ message: "Signup failed" });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findUser(email, password);
    console.log("User from DB:", user);

    if (user === null) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await Log.createLog(email);

    // ✅ FIXED (was non-blocking → now actually saves to DB)
    await Device.saveDevice(email, req).catch(err =>
      console.error("Device save failed:", err)
    );

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.log("error connecting to database :" + err);
    return res.status(500).json({ message: "Login failed" });
  }
});

// oauth signup + login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post("/auth/google/signup", async (req, res) => {
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

    const existingUser = await User.findEmail(user.email);

    if (!existingUser) {
      await User.createUser(user.email, null, "google");
      await oAuth.createUserOAuth(user.email, "google", user.googleId);
      await Log.createLog(user.email);

      // ✅ FIXED
      await Device.saveDevice(user.email, req).catch(err =>
        console.error("Device save failed:", err)
      );

      const createdUser = await User.findEmail(user.email);

      return res.status(201).json({
        message: "User created successfully using OAuth",
        user: createdUser,
      });
    } else {
      await oAuth.checkOAuthUser(user.email, user.googleId);
      await Log.createLog(user.email);

      // ✅ FIXED
      await Device.saveDevice(user.email, req).catch(err =>
        console.error("Device save failed:", err)
      );

      return res.status(200).json({
        message: "Login successful",
        user: existingUser,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid Google token" });
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

    // ✅ FIXED
    await Device.saveDevice(user.email, req).catch(err =>
      console.error("Device save failed:", err)
    );

    const foundUser = await User.findEmail(user.email);

    return res.status(200).json({
      message: "Google login successful",
      user: foundUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid Google token" });
  }
});

app.post("/getInfo", async (req, res) => {
  try {
    console.log("req.body:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const foundUser = await User.findEmail(email);
    console.log("found user:", foundUser);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      userCode: foundUser.user_code,
      email: foundUser.email,
      creationDate: foundUser.created_at,
    });
  } catch (err) {
    console.error("getInfo error:", err);
    return res.status(500).json({ error: "info fetching failed" });
  }
});

// security question adding route
app.post("/addSecurityQ", async (req, res) => {
  try {
    const { email, questionID, answer } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const hasSQ = await securityQs.checkSQ(email);

    if (!hasSQ && (!questionID || !answer)) {
      return res.status(200).json({
        hasSecurityQuestion: false
      });
    }

    if (hasSQ) {
      return res.status(200).json({
        hasSecurityQuestion: true
      });
    }

    await securityQs.addSecurityQ(email, questionID, answer);

    return res.status(200).json({
      hasSecurityQuestion: true,
      message: "Security question added successfully"
    });

  } catch (err) {
    console.error("security question error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.post("/getDevices", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const devices = await Device.getDevices(email);

    return res.status(200).json({ devices });
  } catch (err) {
    console.error("getDevices error:", err);
    return res.status(500).json({ error: "Failed to fetch devices" });
  }
});

app.listen(port, () => {
  console.log("server has started on port " + port);
});
