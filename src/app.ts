import "reflect-metadata";

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/register";
import { LoginResolver } from "./modules/user/login";
const app = express();
const port = 7000;

//create a middleware for authentication


async function main() {
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [RegisterResolver , LoginResolver],
            validate: true
        }),
        formatError: (err) => {    // Don't give the specific errors to the client.    if (err.message.startsWith("Database Error: ")) {      return new Error('Internal server error');    }    // Otherwise return the original error.  The error can also    // be manipulated in other ways, so long as it's returned.
            console.log(err);
            return err;
        },
    });

    apolloServer.applyMiddleware({
        app,
    });

    app.listen(port, () => {
        return console.log(`server is listening on ${port}`);
    });
}


main().catch((e) => {
    console.log(e);
})
