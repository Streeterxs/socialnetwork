import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import cors from 'kcors';
import graphqlHttp from 'koa-graphql';
import koaPlayground from 'graphql-playground-middleware-koa';

import { Schema } from './schema/Schema';
import User, { IUser } from './modules/users/UserModel';
import getUser from './auth';

dotenv.config({path: path.join(__dirname, '/./../.env')});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const router = new Router();
const app = new Koa();

app.use(logger());
app.use(cors());

const graphQLHttpSettings = async (req: any) => {
    const user: IUser = await getUser(req.headers.authorization);
    return {
        graphql: true,
        schema: Schema,
        context: {
            user,
            req
        },
        formatError: (error: GraphQLError) => {
            console.log(error.message);
            console.log(error.locations);
            console.log(error.stack);
            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack
            }
        }
    }
}

const graphqlServerConfig = graphqlHttp(graphQLHttpSettings);

router.all('/graphql', graphqlServerConfig);
router.all('/graphql', koaPlayground({
    endpoint: 'graphql',
    subscriptionEndpoint: '/subscriptions'
}));

app.use(router.routes()).use(router.allowedMethods());


export default app;



const pubsub = new PubSub();
export { pubsub };