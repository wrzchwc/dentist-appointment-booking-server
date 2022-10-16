import './passport';
import cookieSession from 'cookie-session';
import cors from 'cors';
import environment from './environment';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import { v1 } from '../api';

const keys = environment.cookieKeys;
export const app = express();

app.use(cors({ origin: environment.origin }));
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(cookieSession({ name: 'session', maxAge: 86400000, keys }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/v1', v1.api);
app.get('/', (req, res) => {
    res.send(
        `
        <a href='/v1/auth/google'>Zaloguj się kontem Google</a>
        <a href='/v1/auth/sign-out'>Wyloguj się</a>
        `
    );
});
