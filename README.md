# Role-Based Access Control (RBAC) in NestJS using MongoDB

This template repository contains an implementation of Role-Based Access Control (RBAC) using NestJS, a progressive Node.js framework, and MongoDB, a NoSQL database.

The RBAC system is designed to manage user permissions and roles efficiently within an application. The project is designed to help you quickly set up a secure backend with authentication and authorization.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (https://nodejs.org/)
- Docker (https://www.docker.com/)
- NestJS CLI (https://docs.nestjs.com/cli/overview)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amanpreet-dev/nestjs-rbac-starter.git
   cd nestjs-rbac-starter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Copy `.env.sample` to `.env` and update the environment variables according to your setup.

4. Start the required services using Docker:

   ```bash
   docker compose up -d
   ```

5. Start the NestJS application in Devlopment mode:

   ```bash
   npm run start:dev
   ```

6. Access the API at `http://localhost:3000`.

## Project Structure

```plaintext
src/
├── iam/           # IAM module, contains authentication and authorization logic
├── users/         # Users module
├── app.module.ts  # Main application module
├── main.ts        # Entry point of the application
```

## Defining & Assigning Roles

Roles and permissions are defined in the `src/users/enums/role.enum.ts` file. Modify this file to add or remove roles as needed.

Use the `@Roles()` decorator on your route handlers to specify which roles can access a particular route. The AuthGuard will automatically enforce these restrictions.
For example:

```typescript
@Roles('admin')
@Get()
async findAll(): Promise<User[]> {
  return this.usersService.findAll();
}
```

You can also use the `@Roles()` decorator to specify multiple roles that can access a route. For example:

```typescript
@Roles('admin', 'user')
@Get()
async findAll(): Promise<User[]> {
  return this.usersService.findAll();
}
```

## Accessing the Active User

You can also use the @ActiveUser() decorator to access the current active user object in your route handlers. For example:

```typescript
@Roles('admin')
@Get()
async findAll(@ActiveUser() user: ActiveUserData): Promise<User[]> {
  console.log('ActiveUser:', user);
  return this.usersService.findAll();
}
```

## API Endpoints

### Authentication

- `POST /auth/sign-up`: To create or register a new user.
- `POST /auth/sign-in`: Signin and obtain a set of signed JWT Access Token and a Refresh Token.
- `POST /auth/refresh-tokens`: Refresh the JWT token using the Refresh Token.

### Users

- `GET /users`: Get a list of users (Admin only).
- `POST /users`: Create a new user.
- `GET /users/:id`: Get a user by ID.
- `PUT /users/:id`: Update a user by ID.
- `DELETE /users/:id`: Delete a user by ID (Admin only).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Blog Series

I have documented the entire process of implementing this Role-Based Access Control (RBAC) system in NestJS with MongoDB in a detailed blog series. This series covers everything from the initial setup, defining roles and permissions, securing endpoints, to integrating MongoDB. It's a great resource for understanding the inner workings of this project and for those looking to implement a similar system.

Here are the links to the blog posts:

1. [An introduction on the project and it covers setup, creating resources, and integrating MongoDB.](https://blog.amanpreet.dev/how-to-implement-role-based-access-control-in-nestjs-with-mongodb-part-1)
2. [Implement password hashing, create sign-in, and sign-up routes.](https://blog.amanpreet.dev/how-to-implement-role-based-access-control-in-nestjs-with-mongodb-part-2)
3. [Explains how to implement JWT authentication and protect routes with guards.](https://blog.amanpreet.dev/how-to-implement-role-based-access-control-in-nestjs-with-mongodb-part-3)
4. [Learn how to add public routes and create a custom Active User Decorator.](https://blog.amanpreet.dev/how-to-implement-role-based-access-control-in-nestjs-with-mongodb-part-4)
5. [Covers how to implement refresh tokens and invalidate tokens.](https://blog.amanpreet.dev/how-to-implement-role-based-access-control-in-nestjs-with-mongodb-part-5)
6. [Set up roles, permissions, and secure user access.](https://blog.amanpreet.dev/how-to-implement-role-based-access-control-in-nestjs-with-mongodb-part-6)

These posts are intended to provide a comprehensive guide to building a robust RBAC system with NestJS and MongoDB. Whether you're a beginner or an experienced developer, there's something to learn from this series.

Feel free to check out the [blog series](https://blog.amanpreet.dev/series/implement-role-based-access-control-in-nestjs-using-mongodb) and reach out if you have any questions or feedback.

## Future Improvements

To improve this RBAC system and make it more robust and user-friendly. Here are some of the enhancements you can expect in the future:

- **Documentation**: Expanding the documentation to include more examples and best practices.
- **Testing**: Implementing comprehensive tests to ensure the system's reliability and security.

## Acknowledgments

A special thanks to the NestJS team and their comprehensive courses. This project was greatly influenced by the knowledge and best practices shared through their courses. Their dedication to providing high-quality educational content has made the implementation of this Role-Based Access Control (RBAC) system possible.

- [NestJS Courses](https://courses.nestjs.com/) - For their invaluable courses and resources.

Their tutorials not only helped in understanding the core concepts of NestJS but also in applying these concepts to build a secure and efficient RBAC system using MongoDB.

Additionally, I'd like to thank the broader NestJS community for their support and contributions to the ecosystem, making it a robust framework for developers to build scalable server-side applications.

## Contact

For any questions or inquiries, please contact [Aman](mailto:dalmi.aman@gmail.com).
