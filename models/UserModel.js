const mysql = require('mysql2');
const db = require('../config/DbConfig');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  save() {
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, this.password],
      (err, res) => {
        if(err) {
          console.err('User save error', err);
        }
      }
    );
  }
  
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username],
        (err, results) => {
          if(err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }
}

module.exports = User;