# 3813ICT Assignment1

## About Assignment1 
 This project is about creating chat system using node js as a server and angualr framework as a front-end This project will contain login component, register component, user component and in real time chat with other groups and roles of each users.
 
## Version Control
This assignment uses github, a git repository hosting service, to manage the project. The repository name "angualr" was created for the assignment. Once I have done some of the part such as creating a login component, I have added and pushed to my repository. Bascically, I have pushed to my git repository once I have completed some components. This repository will contain REDME.md file to document about the proejct like data strucutre of a variable and also the overall description of the project.

## Rest API 
 Front-end angular will coummuncate with node js server using routes. 
 
 * http://localhost:3000/api/auth: This route is used to check whether the email and password are correct. This is a post method that needs two parametes which are email and password. Once the user put email and password, the local host 4200 will send a api/auth routes to local host 2000 and check whether the input value of email and password are correct. Once it is correct, this will send a user detail back to the localhost 4200 with a valid true.
 
 * http://local:3000/api/register: This route is used to create another user. This is a post method that needs two parametes which are email, password, birthday, age and username. Once the data was sent to the server, this data will be added to the users list. 

# Assignment1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
