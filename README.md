<h1  align="center">
  Rest-Cars!
</h1>
  
## 📍 Index


- [About](#About)

- [Applied technologies](#applied-technologies)

- [How to use](#how-to-use)

- [How to contribute](#hot-to-contribute)
  

<a  id="about"></a>
## 📑 About

Welcome! 

This project was made in studies about  ReactJS, NodeJS, TypeScript and PostgreSQL.

<a  id="applied-technologies"></a>
## 💻 Applied technologies

The project was developed using the following technologies:

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [React/Bootstrap](https://react-bootstrap.github.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://hub.docker.com/)


<a  id="how-to-use"></a>
## ⁉ How to use

- ### **Prerequisites**

- It is necessary to have the **[Node.js](https://nodejs.org/en/)** installed
- It is necessary to have the **[Docker](hhttps://hub.docker.com/)** installed
- It is necessary to have the **[PostgreSQL] instance **[Docker](https://hub.docker.com/_/postgres)** installed.
- It is necessary to have a package manager installed, like **[NPM](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)**
- It is necessary to have the **[React](https://reactjs.org/)** installed in global way.

1. Cloning the application:

```sh

$ git clone https://github.com/viniciusrma/rest-cars

```

2. Running the Application:

The application runs in two parts:

server-api & web-cars

```sh

# Open the terminal in the server-api directory and install the dependences by typing:

$ yarn / or npm install

# If you don't have the docker installed in global way, you will have to do this to have access to the DB.

- https://docs.docker.com/engine/install/ubuntu/ - Here you sill find instructions to install it on your machine.

# Then you have to connect do the DB instance, running the command below:

$ docker run --name postgres -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres

# Then you have to start the DB, by running the command below:

$ docker start postgres (notice that postgres here is the name of the DB, not the technology)

# Then you can run the development environment by typing:

$ yarn start:dev


# Launch web application

$ cd web-cars

$ yarn (or npm install) to update the dependencies

$ yarn start - to run the project.

```

<a  id="hot-to-contribute"></a>
## ♻️ How to contribute

- Fork this repository;

- Create a branch with you feature: `git checkout -b my-feature`;

- Commit your changes: `git commit -m 'feat: My new feature'`;

- Push into your: `git push origin my-feature`;

---

<h4  align="center">
Made by <a  href="https://www.linkedin.com/in/viniciusrma/"  target="_blank">Vinícius Morais</a>
</h4>

