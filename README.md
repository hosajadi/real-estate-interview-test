# Real Estate API Server test

# Introduction
Here we implemented an API server for the interview test.

## Technical Notes
1- Considering the specific requirements of the challenge, we need to assume that the _id field in our schemas
will be an integer. Since we're using MongoDB as our database, we must manually assign values to the _id field during the creation of new documents

2- An Swagger api documentation has been implemented, and it is accessible at http://localhost:3000/docs 
 => with `username: admin` and `password: admin`

3- A Postman document containing all endpoints has been exported and attached to the email.

4- Although the challenge did not explicitly request it, we have implemented some additional endpoints, such as booking list and user list, among others. 

5- Although the challenge doesn't require implementing the entire authentication process, and given that we can't use a mail server in test mode, we have implemented all necessary logic for email verification. For this challenge, you do not need to verify your email manually; it will be verified automatically after a register operation.

6- In this test, we utilized an online cloud database, so there's no need for you to create one.

7- The service has been dockerized; however, for testing purposes, you can simply run the project with Node.js.

8- The .env file will be attached to an email.

## How to run/build the project
**Run in Watch mode:** `nest start --watch` or `yarn start:dev`

**Run in Dev mode:** `nest start` or `yarn start`

**Build the project:** `nest build` or `yarn build`
