import express from 'express';
import {logger} from "./middlewares/logger";

const app = express();
const port = 3003;

app.use(express.static('./src/public'));
app.use(express.json());
app.use(logger)


app.get('/', async (req, res) => {
    res.type('html');


    res.status(200).send('Home!!!!');
    console.log(req.method);

});

app.get('/users', (req, res) => {
    res.status(200).json([{name: 'John'}, {name: 'Jane'}, {url: req.url}]);
})

app.post('/users', (req, res) => {
    res.status(200).json({body: req.body});
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);


});

