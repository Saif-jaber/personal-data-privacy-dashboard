import pool from "../db.js";

const securityQs = {
  async addSecurityQ(email, questionID, answer) {
    const userResult = await pool.query("SELECT id FROM users WHERE email = $1",[email]);

    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }

    const userID = userResult.rows[0].id;

    await pool.query("INSERT INTO security_Qs (user_id, SecQuestion, Answer) VALUES ($1, $2, $3)",[userID, questionID, answer]);
  },

  async checkSQ(email) {
    const userResult = await pool.query("SELECT id FROM users WHERE email = $1",[email]);

    if (userResult.rows.length === 0) {
      throw new Error("User not found");
    }

    const userID = userResult.rows[0].id;

    const result = await pool.query("SELECT 1 FROM security_Qs WHERE user_id = $1 LIMIT 1",[userID]);

    return result.rows.length > 0;
  },
};

export default securityQs;