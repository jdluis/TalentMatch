# TalentMatch

![Logo Talent Match](public/images/logoTalentMatch.png)

## This app has been developed by:
 ### [Alberto Pérez León](https://github.com/Apleon89)
 ### [Jose Daniel De Luis Ramírez](https://github.com/jdluis)

<br>

## Description
The app is a developer search engine that helps companies find talented developers based on specific criteria such as skill set, experience level, and location. It offers a database of developers who have created profiles showcasing their skills and experience. Companies can browse these profiles and filter results to find the best candidates for their projects. The app also provides features such as messaging and interview scheduling to streamline the hiring process. With its focus on connecting companies with developers, the app offers a valuable resource for businesses looking to build their development teams without the need to post specific job listings.
<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog

List of other features outside of the MVPs scope

More Filters:
- Sort by News devs/companies
- Sort by experiences
- Filter by companies marked by developers 

Auth:
- Login and Sign Up with Google Account
- SuperAdmin by /admin, secret login form

Homepage
- Add Slider with more info about the company of develop

SuperAdmin:
- Views for Administration of all devs, companies register
- New route for that
- Allow to deactivate users or companies, allow to created news users...

Chat:
- Improve the render
- Add timesTamps to the Model of Messages
- Add time in view of each message

## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects auth/login
  - renders signup-form
- POST /auth/signup
  - redirects to login view
  - body:
    - email,
    - password: hashPassword,
    - name: email
- GET /auth/login
  - renders login-form
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password
- POST /auth/logout
  -  redirects to HomePage

- GET /company
  - renders the devs List and main menu of company
  
- GET /company/:devId/details
  - renders devDetails
  - Data:
    - devDetails,
    - isFavorite,
- POST /company/:devId/details
  - redirects to devDetails
  - Add to Favorite

- GET /company/profile
  - renders company profile
  - includes companyUser data
- GET /company/profile/edit
  - render company/edit
  - data: 
    - companyUser,
    - selectedTechStack,
    - deselectedTechStack,
- POST /company/profile/edit"
  - redirect to company/profile
  - Body:
    - companyName,
    - email,
    - description,
    - telephone,
    - direction,
    - linkedin,
    - facebook,
    - twitter,
    - website,
    - techStack,
    - existingImage
 
- GET /company/profile/delete
  - render company/delete
  - body: companyUser
- POST /company/profile/delete
  - redirects to HomePage
 
- GET /dev
  - renders the devs List and main menu of dev
  
- GET /dev/:devId/details
  - renders devDetails
  - Data:
    - devDetails,
    - isFavorite,
- POST /dev/:devId/details
  - redirects to devDetails
  - Add to Favorite

- GET /dev/profile
  - renders dev profile
  - includes devUser data
- GET /dev/profile/edit
  - render dev/edit
  - data: 
    - devUser,
    - selectedTechSkills,
    - deselectedTechSkills,
- POST /dev/profile/edit"
  - redirect to dev/profile
  - Body:
    - name
    - secondName
    - email
    - telephone
    - location
    - experience
    - description
    - techSkills
    - softSkills
    - softSkillsChecked
    - resume
    - linkedin
    - facebook
    - twitter
    - isWorking
    - existingImage
 
- GET /dev/profile/delete
  - render dev/delete
  - body: devUser
- POST /dev/profile/delete
  - redirects to HomePage

- GET /message
  - renders the messages List and main menu of message
  
- GET /message/:id
  - renders index, list of user where you have a message
  - Data:
    - messages
    - idMsgView
    - isDev
    - user
- POST /message/:id
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)
- POST /message/:idForMsg/delete
  - redirects to messages
  - body: 
    - message
    - receiver
    - transmitter
    - transmitterModel
    - receiverModel

## Models

 #### [Company model](models/Company.model.js)
 
 #### [Dev model](models/Dev.model.js)
 #### [Message model](models/Message.model.js)


## Links

### Trello

[Link to your trello board](https://trello.com/b/lzBvPe8z/talentmatch)

### Git

[Repository Link](https://github.com/jdluis/TalentMatch)

[Deploy Link](https://talentmatch.cyclic.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1dsCFgbPfTLp3lYZvawO0Kjkdkr--jp7IKilH9hGbb7k/edit#slide=id.p)

