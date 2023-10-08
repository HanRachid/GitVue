# GitVue

GitVue is a web application that utilizes the GitHub API to allow users to check their commits and branches for any of their repositories. This app provides a convenient way for users to keep track of their code changes and repository branches directly from their GitHub account.

## Features

- **Commit Viewer**: Users can view their recent commits across all their repositories. The app displays the commit message, commit author, and the associated repository for each commit.

- **Branch Viewer**: Users can browse through the branches of their repositories. They can see the branch name, the repository it belongs to, and additional details such as the last commit on the branch.

## Prerequisites

To run this application locally or deploy it to a server, you need to have the following prerequisites:

- **GitHub Account**: You need a valid GitHub account to access the GitHub API and retrieve repository information.

- **OAuth app ids**: Generate public and private ids on GitHub. This token will be used to authenticate your requests to the GitHub API.

- **Web Browser**: Make sure you have a modern web browser installed that supports JavaScript.

## Installation

- **npm install**: please install the dependencies on both the root folder and on the backend folder, as this is a monorepo project.

- **environment variables**: environmen variables should be in both backend and frontend app. for the backend, the oauth app public and secret keys are necessary, port is optional. For frontend, the default url is my vercel app, please specify your own backend.

- *Github OAuth settings* In the OAuth app, you can specify "{yoururl}/index" as the base url, and "{yoururl}/login" as callback url

## Used technologies 

- **Html / Css**
- **VueJs / Javascript**
- **Typescript**




