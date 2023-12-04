## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v20.10: We recommend using NVM (Node Version Manager) to manage Node.js versions.

## Installing Node.js with NVM

[NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) is a tool that allows you to easily switch between different Node.js versions. Follow these steps to install Node.js v20.10 using NVM:

1. Install NVM by following the instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Open a new terminal window.
3. Install Node.js v20.10 by running the following command:
   ```bash
   nvm install 20.10
   ```
4. Set Node.js v20.10 as the default version:
   ```bash
   nvm use 20.10
   ```

## Installing Dependencies

To install project dependencies, use either Yarn or npm.

### Using Yarn

[Yarn](https://yarnpkg.com/) is a fast, reliable, and secure dependency manager for Node.js. If you don't have Yarn installed, follow the instructions [here](https://yarnpkg.com/getting-started/install).

After installing Yarn, navigate to the project root and run:

```bash
yarn install
```

### Using npm

[npm](https://www.npmjs.com/) is the default package manager for Node.js. It comes bundled with Node.js. To install project dependencies with npm, run:

```bash
npm install
```

## Running the Project

Once the dependencies are installed, you can start the development server using the following script:

```bash
yarn dev
# or
npm run dev
```

This command will launch the server in development mode, allowing you to work on the LearnHub-Backend.