import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './guard/roles.guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new RolesGuard(new Reflector()));
  const config = new DocumentBuilder()
    .setTitle('ecomm')
    .setDescription('ecommerce')
    .setVersion('1.0')
    .addTag('ecommerce')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap()
  .then(() => {
    console.log('api running at port 8000');
  })
  .catch((err) => {
    console.log(err.message);
  });
