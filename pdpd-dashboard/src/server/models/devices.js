import pool from "../db.js";
import crypto from "crypto";
import { UAParser } from "ua-parser-js"; // ✅ FINAL FIX
import fetch from "node-fetch";


const saveDevice = async (email, req) => {
  try {
    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    const ip = req.ip || "unknown";

    const deviceHash = crypto
      .createHash("sha256")
      .update(ip)
      .digest("hex");

    let country = "Unknown";

    try {
      if (ip !== "127.0.0.1" && ip !== "::1" && ip !== "unknown") {
        const response = await fetch(`http://ip-api.com/json/${ip}`);

        if (response && response.ok) {
          const geo = await response.json();

          if (geo && geo.status === "success") {
            country = geo.country || "Unknown";
          }
        }
      }
    } catch (err) {
      console.log("Geo API failed");
    }

    try {
      const existing = await pool.query(
        `SELECT * FROM devices WHERE user_email = $1 AND device_hash = $2`,
        [email, deviceHash]
      );

      if (existing.rows.length > 0) {
        await pool.query(
          `UPDATE devices SET last_active = CURRENT_TIMESTAMP WHERE id = $1`,
          [existing.rows[0].id]
        );
      } else {
        await pool.query(
          `INSERT INTO devices 
          (user_email, device_name, browser, os, device_hash, country)
          VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            email,
            ua.device.model || "Desktop",
            ua.browser.name || "Unknown",
            ua.os.name || "Unknown",
            deviceHash,
            country
          ]
        );
      }
    } catch (dbErr) {
      console.error("Device DB error:", dbErr);
    }

  } catch (err) {
    console.error("Device error:", err);
  }
};

const getDevices = async (email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM devices 
       WHERE user_email = $1 
       ORDER BY last_active DESC`,
      [email]
    );

    return result.rows;
  } catch (err) {
    console.error("Get devices error:", err);
    return [];
  }
};

const deleteDevice = async (id) => {
  try {
    await pool.query(
      `DELETE FROM devices WHERE id = $1`,
      [id]
    );
  } catch (err) {
    console.error("Delete device error:", err);
  }
};

export default {
  saveDevice,
  getDevices,
  deleteDevice
};
