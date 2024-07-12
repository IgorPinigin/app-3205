import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

interface User {
    email: string;
    number: string;
}
let currentTimeout:any = null

app.post('/search', (req, res) => {

    const users: User[] = JSON.parse(fs.readFileSync('users.json', 'utf-8')); 
    const { email, number } = req.body;
    let results = users.filter(user => user.email.includes(email));
    if (number) {
        results = results.filter(user => user.number.includes(number));
    }

    if (currentTimeout) {
        clearTimeout(currentTimeout);
    }

    currentTimeout = setTimeout(()=>{
        res.json(results)
    },5001)
 
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});