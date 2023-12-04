# LearnHub-Backend

Welcome to LearnHub-Backend, the backend infrastructure for our innovative learning platform.

## Getting Started

Below are instructions on how to install your project and get started on contributing. You have many choices to choose from with different pros and cons. My suggestion would be to install Docker on your local machine so that databases and other services needed won't need to be configured and installed seperately.

Skip to installing Docker.

### Node.js and Package Managers

#### [Node.js (NVM)](https://github.com/nvm-sh/nvm)

Node Version Manager (NVM) is a tool that allows you to easily switch between different Node.js versions.

##### Install NVM on Windows

Follow the instructions on the [NVM GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating).

##### Install NVM on Linux and macOS

Follow the instructions on the [NVM GitHub page](https://github.com/nvm-sh/nvm#install--update-script).

#### [Node.js](https://nodejs.org/)

Node.js is a JavaScript runtime that allows you to run JavaScript on the server-side.

##### Install Node.js using NVM

```bash
nvm install 20.10
nvm use 20.10
```

### Package Managers

#### [npm](https://www.npmjs.com/)

npm is the default package manager for Node.js. It is used to install project dependencies.

##### Install npm

npm is included with Node.js. Ensure it's installed by running:

```bash
npm -v
```

#### [Yarn](https://yarnpkg.com/)

Yarn is an alternative package manager for Node.js, known for its speed and reliability.

##### Install Yarn

Follow the instructions on the [Yarn website](https://yarnpkg.com/getting-started/install).

### Docker

#### [Docker](https://www.docker.com/)

Docker is a platform for developing, shipping, and running applications in containers.

##### Install Docker

- [Install Docker on Windows](https://docs.docker.com/desktop/install/windows/)
- [Install Docker on Linux](https://docs.docker.com/desktop/install/linux/)
- [Install Docker on macOS](https://docs.docker.com/desktop/install/mac/)

### Running the Backend on Docker

You can run the backend on Docker to ensure consistent environments for all contributors.

#### Build Docker Image

Navigate to the project root and run:

```bash
docker build -t learnhub-backend:latest -f .docker/Dockerfile .
```

#### Run with Docker Compose

Docker Compose simplifies multi-container Docker applications. It's configured in `.docker/docker-compose.yml`.

##### Install Docker Compose

Follow the instructions on the [Docker Compose GitHub page](https://docs.docker.com/compose/install/).

##### Run the Backend with Compose

Navigate to the project root and run:

```bash
docker-compose -f .docker/docker-compose.yml up
```

This will set up the backend, databases, and any other tools needed.

