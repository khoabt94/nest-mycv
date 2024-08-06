import { INestApplication } from "@nestjs/common"
import { ValidationPipe } from '@nestjs/common';
var cookieSession = require('cookie-session')

export function setupApp(app: INestApplication<any>) {
  app.use(cookieSession({
    name: 'session',
    keys: ['mycvtestappkhoa'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
}