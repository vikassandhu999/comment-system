import "reflect-metadata";

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createConnection } from "typeorm";
import router from './router';

const app = express();
const port = 7000;

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.json());

async function main() {
    await createConnection();

    app.use(router);

    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        return console.log(`server is listening on ${port}`);
    });
}


main().catch((e) => {
    // tslint:disable-next-line:no-console
    console.log(e);
})
