import express from 'express';
import expressConfig from './config/express.js';

const app = express();
expressConfig(app);
