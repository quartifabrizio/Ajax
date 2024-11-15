const express = require('express');
const sqlite = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;


let db = new sqlite.Database('./database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connesso al database SQLite');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


db.run(`CREATE TABLE IF NOT EXISTS utenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    citta TEXT,
    titolo_studio TEXT,
    password TEXT
)`);

app.get('/utenti', (req, res) => {
    db.all('SELECT * FROM utenti', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.get('/utenti/diploma', (req, res) => {
    db.all('SELECT * FROM utenti WHERE titolo_studio = ?', ['diploma'], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ utenti: rows });
    });
});


// Avvio del server
app.listen(port, () => {
   
});;

