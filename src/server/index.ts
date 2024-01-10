import express, { Express } from 'express';
import { Server } from 'http';

export default interface IServer {
    app: Express;
    router: express.Router;
    server: Server;
    start(port: number, callback: (port: number) => void): void;
    stop(callback: (error?: Error) => void): void
}