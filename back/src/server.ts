import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { User } from './types/User';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/search', (req, res) => {

    const users: User[] = JSON.parse(fs.readFileSync('users.json', 'utf-8')); 
    const { email, number } = req.body;
    let results = users.filter(user => {
        const emailMatch = user.email.includes(email);
        const numberMatch = !number || user.number.includes(number);
        return emailMatch && numberMatch;
    });

    setTimeout(()=>{
        res.json(results)
    },5000)
 
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});