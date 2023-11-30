import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { ENVIRONMENT, CORS_URL, PORT, CDN } from '@/config/index';
import { dbConnection } from '@/db/index';
import { Routes } from '@interfaces/routes.interface';
import { logger } from '@utils/logger';
import { ErrorMiddleware } from '@middleware/error.middleware';
import { HttpException } from './http/HttpExceptions';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = ENVIRONMENT || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`Environment: ${this.env}`);
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: CORS_URL, credentials: true }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
    this.app.use('*', function (req, res) {
      throw new HttpException(404, 'Whatt?');
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
