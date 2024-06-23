<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Inversión de Dependencias

La inversión de dependencias es un principio de diseño de software que ayuda a desacoplar los módulos de tu código y hacerlos más modulares y testeables.

En términos simples, la inversión de dependencias significa que los módulos de alto nivel, que proporcionan la lógica de negocio compleja, no deben depender de los módulos de bajo nivel, que proporcionan operaciones básicas. En lugar de eso, ambos deben depender de abstracciones.

En nuestro código, `MongooseUserRepository` implementa la interfaz `UserRepositoryPort`. Esto significa que `MongooseUserRepository` no es una dependencia concreta, sino una abstracción. Cualquier parte de nuestro código que necesite interactuar con un repositorio de usuarios no necesita saber nada sobre Mongoose o MongoDB. Solo necesita saber sobre `UserRepositoryPort`.

Esto tiene varias ventajas:

- **Desacoplamiento:** Nuestra lógica de negocio no está acoplada a ninguna tecnología de base de datos específica. Podríamos cambiar a una base de datos diferente simplemente implementando `UserRepositoryPort` con una clase diferente.

- **Testeabilidad:** Podemos probar nuestra lógica de negocio de forma aislada, sin necesidad de una base de datos real. Solo necesitamos proporcionar una implementación falsa de `UserRepositoryPort`.

- **Legibilidad:** Al leer nuestro código, es fácil ver qué hace sin tener que entender los detalles de cómo interactúa con la base de datos. Solo necesitamos entender la interfaz `UserRepositoryPort`.

En resumen, la inversión de dependencias nos ayuda a escribir código que es más modular, testeable y fácil de entender.


Ahora, supón que decides cambiar a una base de datos SQL. Si no estuvieras utilizando la inversión de dependencias, tendrías que cambiar todas las partes de tu código que utilizan `MongooseUserRepository`.

Pero gracias a la inversión de dependencias, solo necesitas crear una nueva clase que implemente `UserRepositoryPort` para la base de datos SQL:

```typescript
@Injectable()
export class SqlUserRepository implements UserRepositoryPort {
  constructor(
    private readonly userModel: SqlModel<User>, // Suponiendo que SqlModel es una clase que interactúa con la base de datos SQL
  ) { }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id); // Suponiendo que SqlModel tiene un método findById similar
    return user as IUser;
  }
}

```

Ahora, puedes cambiar entre `MongooseUserRepository` y `SqlUserRepository` simplemente cambiando la clase que proporcionas para el token `UserRepositoryPort` en tu módulo:

```typescript
{
  provide: 'UserRepositoryPort',
  useClass: SqlUserRepository, // Cambia esto a MongooseUserRepository para volver a MongoDB
}

```

De esta manera, la inversión de dependencias te permite cambiar las implementaciones subyacentes sin afectar a las partes de tu código que dependen de la interfaz `UserRepositoryPort`.

