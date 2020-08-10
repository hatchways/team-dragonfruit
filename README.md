# Mentorshare App

## Table of Contents
[About](#about)

[Tech Stack](#tech-stack)




## About
This is a web application that enables users to upload their code snippets and have them reviewed by other developers.

## Tech Stack
##### MERN: MongoDB, Express, ReactJS, NodeJS
##### Material-UI
##### Mongoose
##### JSON Web Token
##### Socket.io
##### Stripe

## Work flow
* Each user must specify their level of knowledge in at least one programming language, and they can only upload snippets in that language.

![Image](https://github.com/hatchways/team-dragonfruit/blob/dev/assets/screenshots/onboarding.png "Onboarding Page")

![Image](https://github.com/hatchways/team-dragonfruit/blob/dev/assets/screenshots/upload.png "Onboarding Page")


* Users need to pay for their code to be reviewed and each review costs one credit. 
* Users can increase their balance through online payment, handled by `Stripe`.

![Image](https://github.com/hatchways/team-dragonfruit/blob/dev/assets/screenshots/balance.png "Update Balance")


* Reviewers receive credit for reviewing.
* Code snippets are matched with reviewers automatically, based on knowledge level of the author and a potential reviewer which is equal or greater.
* The matched reviewer is requested to review a code snippet, and they have the chance to accept or decline the request.

![Image](https://github.com/hatchways/team-dragonfruit/blob/dev/assets/screenshots/reviewes.png "Reviews Page")

* Once accpeted, the reviewer can comment on the code snippet and submit it for the author to view.

## Getting started
**1.** In order to run this app, you need to have `node.js` installed.

**2.** `git clone git@github.com:hatchways/team-dragonfruit.git`

**3.** Install server-side dependencies and start running:
  ```
  cd team-dragonfruit/server
  ```
  ```
  npm install
  ```
  ```
  npm run dev
  ```
   ##### Environment variables

   In order to run the server, you need to create `.env.local` file in `/server` with the following content:

```
MONGODB_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-ttgy0.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
JWT_SECRET=<JWT_SECRET>
STRIPE_SECRET=<STRIPE_SECRET>
```
**4.** Install client-side dependencies and start running:
  ```
  cd team-dragonfruit/client
  ```
  ```
  npm install
  ```
  ```
  npm run start
  ```
  
  

