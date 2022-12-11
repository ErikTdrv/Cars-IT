# CarsIT
Simple app for study purposes, created with Angular as front-end, Node.js as back-end and MongoDB as database.

<p align="center">
  <img style="text-align: center" src="/client/src/assets/githubprojectimage.png" width="800" title="project-image">
</p>

<!-- ![Alt text](/client/src/assets/githubprojectimage.png "Title") -->
## General information
* The main purpose of the app is to view/add cars for sale.
* Guests are only able to see Home Page, All Cars and VIN Dictionary.
* Logged in users have access to Add Car, My Cars and Profile information, as well they have the ability to Edit/Delete their own posts.
* <b>VIN Dictionary</b> is a special page which gets data from a 3<sup>rd</sup> API(Car Utils). To get data about a vehicle it is required to provide a vehicle identification number(VIN) in the input.
* <b>Profile Info</b> is a special page which gets data from a 3rd API(Geolocation). The application will show you information depending on your IP address which will be automatically taken.

## Technologies 
* Client
    * Angular CLI: 15.0.1
    * TypeScript: 4.8.2
* Server
    * Node: 18.12.0
    * ExpressJS: 4.18.2
    * bcrypt: 5.1.0
    * cors: 2.8.5
    * dotenv: 16.0.3
    * jsonwebtoken: 8.5.1,
    * mongoose: 6.7.3,
    * nodemon: 2.0.20
