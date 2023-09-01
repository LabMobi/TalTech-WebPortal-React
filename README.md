# TalTechWebPortal: TalTech Employee Data Management Portal

### Project info

This project is aimed at developing digital services for Tallinn University of Technology (TalTech) staff and students. The primary objectives of the project include:

- Creating a secure web form to collect personal data from new university staff members, thereby eliminating the need for data rewriting.
- Integrating the collected data into the university's human resources software NAV.
- Providing an intuitive user interface through a Single Page Application (SPA) developed using ReactJS and the TalTech component library.
- Implementing a backend using PHP (Laravel) and exposing a REST API.
- Simulating databases for the sample solution using MariaDB.

## Installation and Usage

1. Clone the project repository to your local machine.
2. Navigate to the root directory in your terminal and run `npm install` to install the required dependencies.
3. Launch the project by using the command `npm start`. This will automatically open your default browser and display the project preview.

#### Project Structure

- ## `src`: This folder is the main container of all the code.

  - `api`: This folder contains all services and base request function.
  - `redux`: This folder contains all actions, reducers, thunks and store which is provided by redux.
  - `assets`: Asset folder to store all images and icons.
  - `components`: Folder to store any component that use through app
  - `localization`: Folder to store the languages files.
  - `navigation`: This module handles the navigation logic within the application.
  - `helpers`: This folder contains utility functions and helper modules that are used across the application..
  - `constants`: Folder to store any kind of constants and enums.
  - `hooks`: This folder contains custom React hooks used to enhance component functionality.

## HttpClient

`HttpClient` is a custom HTTP client designed for making API requests in this project. It is built on top of Axios and provides some additional features for handling requests and responses.

### Features

- Automatic handling of authentication tokens.
- Request and response logging in development mode.
- Periodic status checks for ongoing requests.
- Error handling and toast notifications.

  # Redux Documentation

## Introduction

This documentation explains how to manage state using Redux in project. Redux is a JavaScript state management library commonly used with React applications. It centralizes application state, making it easier to manage and separate application logic from the user interface.

## Table of Contents

1. **What is Redux?**

   - Redux Overview
   - Why Use Redux?
   - Key Concepts of Redux

2. **Project Redux Structure**

   - Core Components of Redux
   - Action Types
   - Actions
   - Reducers
   - Redux Store
   - Connectors

3. **Project Contents**

   - Redux Action Types and Descriptions
   - Default Form Data
   - Reducers and Their Core Functions
   - Initial State of the Reducer

4. **Reducer Functions and Examples**
   - `SET_LOGIN`
   - `SET_SELECTED_LOGIN_OPTION`
   - `SET_LANGUAGE`
   - `SET_FORM_PAGE`
   - `UPDATE_FORM_FIELDS`
   - `LOGOUT`
   - `SET_ALL_LOCAL_DATA`
   - `SET_LOADING`
   - `SET_USER_INFO_LOADING`
   - `SET_USER_FILES_LOADING`

## What is Redux?

Redux is a JavaScript library used to manage application state in a predictable and centralized manner. It uses actions to update state, with each action having a type and a payload.

## Why Use Redux?

- To manage state more effectively, especially in large and complex applications.
- To share state across the application when needed.
- To separate application logic from the user interface.

## Key Concepts of Redux

- **Actions**: Redux uses actions to update application state. Each action has a type and a value.

- **Reducers**: Reducers are functions that modify the current state based on actions. Reducers should be pure functions, meaning they do not modify the current state directly but return a new state.

- **Redux Store**: The Redux Store is a centralized object that holds the entire state of the application. It triggers actions to manage state.

- **Connectors**: Connectors are used to communicate between Redux Store and components. They provide components with specific parts of state or actions.

## Project Redux Structure

Understanding the structure of Redux is crucial for managing state effectively in project.

### Redux Action Types and Descriptions

- `LOGOUT`: Action to log the user out.
- `SET_ALL_LOCAL_DATA`: Action to set all local data.
- `SET_FORM_PAGE`: Action to set the current form page.
- `SET_LANGUAGE`: Action to change the language.
- `SET_LOADING`: Action to set loading state.
- `SET_SELECTED_LOGIN_OPTION`: Action to set the selected login option.
- `SET_USER_FILES_LOADING`: Action to set user files loading state.
- `SET_USER_INFO_LOADING`: Action to set user info loading state.
- `UPDATE_FORM_FIELDS`: Action to update form fields.

### Default Form Data

Default form data inside the Redux store contains initial data for user forms.

### Reducers and Their Core Functions

Reducers are the core functions that update the Redux store. Each reducer responds to a specific action type and updates the state accordingly.

### Initial State of the Reducer

Defines the initial state of the Redux store when the application starts.

## Reducer Functions and Examples

Each reducer responds to a specific action type and updates the Redux store accordingly. Here are some example reducer functions:

#### `SET_LOGIN`

This reducer updates the user's login status and token.

#### `SET_SELECTED_LOGIN_OPTION`

Updates the selected login option.

#### `SET_LANGUAGE`

Changes the application language.

#### `SET_FORM_PAGE`

Updates the current form page.

#### `UPDATE_FORM_FIELDS`

Updates form fields.

#### `LOGOUT`

Logs the user out and resets the state.

#### `SET_ALL_LOCAL_DATA`

Updates all local data.

#### `SET_LOADING`

Updates the loading state.

#### `SET_USER_INFO_LOADING`

Updates the user info loading state.

#### `SET_USER_FILES_LOADING`

Updates the user files loading state.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
