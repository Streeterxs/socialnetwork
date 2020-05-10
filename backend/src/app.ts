import Express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Schema } from './schema/Schema';
import cors from 'cors';

console.log('olá');
console.log(path.resolve(__dirname, '/./../.env'));
console.log(path.join(__dirname, '/./../.env'));
dotenv.config({path: path.join(__dirname, '/./../.env')});
console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const app = Express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

export default app;