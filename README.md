# 3813ICT Assignment1
### gitHub: https://github.com/Min5407/angular

## About Assignment1 
 This project is about creating chat system using node js as a server and angualr framework as a front-end This project will contain login component, register component, user component and in real time chat with other groups and roles of each users.
 
## Version Control
This assignment uses github, a git repository hosting service, to manage the project. The repository name "angualr" was created for the assignment. Once I have done some of the part such as creating a login component, I have added and pushed to my repository. Bascically, I have pushed to my git repository once I have completed some components. This repository will contain REDME.md file to document about the proejct like data strucutre of a variable and also the overall description of the project.

## Data Structure
  There are two data strucutre for this project:
  1. Users
  
    {"users": [
    {
      "username": "Super",
      "birthday": "10/01/1990",
      "email": "test1@test.com",
      "password": "111",
      "valid": "",
      "type": "super",
      "groups": ["group1", "group2", "test2"]
    }
    }
  
  2. groups
  
    {"groups": [
      {
        "group": "group1",
        "groupAdmin": "test2",
        "assis": "Super",
        "members": ["Super", "test3"]
      }
    }


## Rest API 
 Front-end angular will coummuncate with node js server using routes. 
 
 * http://localhost:3000/api/auth (post): This route is used to check whether the email and password are correct. This is a post method that needs two parametes which are email and password. Once the user put email and password, the local host 4200 will send a api/auth routes to local host 2000 and check whether the input value of email and password are correct. Once it is correct, this will send a user detail back to the localhost 4200 with a valid true.
 
 * http://local:3000/api/register (post): This route is used to create another user. This is a post method that needs two parametes which are email, password, birthday, age and username. Once the data was sent to the server, this data will be added to the users list. 
 
  * http://local:3000/api/delete (post) : this route uses the user's email to delete the user from the server and sends the updated data to the client side.

 
 * http://local:3000/groups (get): This route is used to get groups from the server by returning the groups data to the client side.
 
 * http://local:3000/users (get) : This route uses get method which sends all users from the server to the client side.
 
 * http://local:3000/giveSuper (post) : This route is used to change the user's type to a super type so that this user can do what super admin can do.
 
 * http://local:3000/group/create (post) : This route uses post method with some parameters like group name, group admin, members of the group and group assist. This is used to create a group. When an admin create a user from the client, the data will be sent to the sever side and create a new group then returns all the groups from the server including the new group.
 
 * http://local:3000/group/delete (post): This route is used to delete the group from the server. Once the server deletes the group,  this will return the updated data back to the client server.
 
 * http://local:3000/groups/group/invite (post): This route is sued to add a member to the group and returns the updated data back to the client side.
 
 * http://local:3000/group/deleteMember (post): This route used post methed to delete the member from a group. Group member name and group name data will be send to the server side and using these data the member will be deleted from the group and returns the update data to the client side.
 
 
  * http://local:3000/getChannels (post): This route is used to get channels from certain group. This takes the group from the client side and sends the channels that belongs to the group.
  
 * http://local:3000/createChannel (post) : This route uses post method to create a channel in certain group. This brings two parameters from the client side which are the group name and channel name and returns true or false to check whether it was succefull or not.
 
 * http://local:3000/deleteChannel (post) : This route is used for deleting a channel from a certain group. By getting two parameters (group name , channel name) from the client side  and uses the parameters to delete the channel and returns the updated channels and groups to the client side.
 
 * http://local:3000/channel/deleteMember (post): This route is very similar to the delete channel route however, this is used for deleting the member from a channel. From the client side, user name, group name and channel name are sent to the server side and use these parameters to delete the member and returns the updated data back to the client side.
 
 * http://local:3000/channel/invite (post) :This route is used for adding member to the channel and it has the same parameters as the deleting member routes. This will add the member to the channel and returns the updated data back to the client side.
 
 

# Angular components / Services / server

  There are few components and service for this project.
  
  ### Components
  1. login component: This component is used to show login form in the DOM and also send request to check the email and password  to the server.
  
  2. app component: This is the nav bar component that dispaly the nav with the links like login, logout, register and so on. This component will direct to the certain component and also will block some of the comoponent if the user has no permission to enter certain component.
  
  3. account component: This component will display the details of the user by retreving from the storage.
  
  4. Register component: This component will display the register form so that the super or group user can create another user. This component will also sends the data to the server so that the server can add the new created user data into the users list.
  
  5. chat component: This component is used for displaying a chat box inside a certain channel.
  
  6. group component: group component is used to display all the groups the user belongs including a button that navigate to the channel component
  
  7. channel component: This component is used for displaying all the channels inside a certain group. 
  
  8. Create channel component: This component is used for displaying the create channel form. This has a channel name input textfield and a create button.
  
  9. create group component: This component will display a form that is used to create a group. This component has inputs like
  group name, group assis,  members of the group and also the create button for this form.
  
  10. users component: this component will display all the users of this website.
  
  ### Services
  
  1. Data service: This service is used for creating functions which is used for a client and server to communicate to each other.
  
 # Node server architecture
 
 This project has few files inside a server folder.

  1. server.js: This is a main server file that listens to the server and also imports other module from different file.
  
  2. login.js: This is a module that exports file which contains a lot of function for the routes. This functions will be listened once the components call a function from a service then the service function will help to communicate with this functions. 
  
  3. data.json: This file is used for storing hard code data such as users and groups. This file will be used in the login.js file. In the starting of a function, the login.js will read the file( data.json) and writes it back to the file whenever there is a change in the data such as adding group or user.
  
  # State Change
  
  ## Client: 
  In the client side, Once the component is loaded it will display the html and css. while displaying the html and css, if html needs a data from a server, the client will use a function to communicate to the server by sending a request such as post or get method with a parameters. Once the server, sends the data back to the client side, the component will uses this data to display it. For example, if the component needs to display the all the groups, then once the component loads the client side will request to the server for the groups data and once the data has been retreived, the data will be used to display all the groups.
    
  ## server:
   In the server, when a request has been made to a server, server uses the data (parameters) from the client and do what it needs to be done and resends the updated data back to the client side. For example, If the client wants to delete a group and wants to have a data without that particular group then the server will help to delete the group from the file (data.json) and sends the updated group back to the client side so that client can display the updated data.
  

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
