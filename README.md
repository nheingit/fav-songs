# Fav songs

Read and write to the DWN to store your favorite songs

## Requirements

To run this project, you will need:

- Node.js (version 14 or later)
- npm or Yarn

You can install Node.js from their [official website](https://nodejs.org) and it comes with npm included. If you prefer to use Yarn, you can follow the instructions from the [Yarn website](https://yarnpkg.com/getting-started/install).

## Installation

To get the project up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nheingit/fav-songs.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd fav-songs
   ```

3. **Install the dependencies:**

   With npm:

   ```bash
   npm install
   ```

   Or with Yarn:

   ```bash
   yarn install
   ```

## Running the Project

Once you have installed the dependencies, you can start the development server with either npm or Yarn:

- With npm:

  ```bash
  npm run dev
  ```

- With Yarn:

  ```bash
  yarn dev
  ```

Now open your web browser and navigate to `http://localhost:5173` (or whatever port your console indicates the server is running on). You should see your Vite app running!

## Building the Project

To build the project for production, use:

- With npm:

  ```bash
  npm run build
  ```

- With Yarn:

  ```bash
  yarn build
  ```

This will create a `dist` directory with the compiled project.

## Testing the Project

If your project has tests, you can run them with:

*Note*: The tests in this project are just an example. I found issues trying to import the Web5 package into jest, so these are merely guide points.

- With npm:

  ```bash
  npm run test
  ```

- With Yarn:

  ```bash
  yarn test
  ```
