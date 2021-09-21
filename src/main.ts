import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new RolesGuard());
  await app.listen(8000);
}
bootstrap()
  .then(() => {
    console.log('api running at port 8000');
  })
  .catch((err) => {
    console.log(err.message);
  });
