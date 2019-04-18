# fit.io-front-end

The front-end part of the fit.io web application
#### Links to the other parts
* [fit.io back-end](https://github.com/ioiliakop/fit.io-back-end)
* [fit.io db](https://github.com/ioiliakop/fit.io-db)

## Built with

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
#### Main libraries used
* [React 16.8.4](https://reactjs.org/) - The Main JavaScript library used
* [Bootstrap 4.3.1](https://getbootstrap.com/) - Main library used to add responsiveness to the app
#### Other libraries/dependencies used
* [jQuery 3.3.1](https://jquery.com/)
* [Popper.js 1.14.7](https://popper.js.org/) - Bootstrap dependency
* [react-fontawesome 0.1.4](https://github.com/FortAwesome/react-fontawesome) - Official Fontawesome 5 component for React
* [react-rating 4.3.1](https://www.npmjs.com/package/react-rating) - a react rating component

## Implemented roles

* __Guest__
  * Any user not logged in
  * Can search for trainers by area, training type, combination of area and training type or view all trainers registered if no search criteria was selected
  * Can view each trainer's profile, along with any reviews
  * Can log-in if he/she already has an account or register either as a user or as a trainer
* __User__
  * Can search and view trainers as above
  * Furthermore, can book a training session with a trainer, selecting from trainer's available date/time, area and training-type
  * 'My Training Sessions' Section
    * Can view his already booked training sessions grouped as future/upcoming, past and cancelled
    * Can send a message to a trainer, after booking a training session with him/her first
    * Can cancel a booked training session
    * Can leave a review/rating for a past training session or view his comment/rating if already reviewed
  * 'My Messages' Section
    * Can view his sent/received messages and reply to trainer
  * 'My Account' Section
    * Can view his account info and upload a profile photo
  * 'My Calendar' Section
    * Can view his training sessions in a calendar form
* __Trainer__
  * 'My Training Sessions' Section
    * Can view his already booked training sessions grouped as future/upcoming, past and cancelled
    * Can send a message to a user who has booked a training session with him/her
    * Can also delete a cancelled training session
    * Can view the comment/rating he has received, if the user has left a review for a past training session
  * 'My Training Types' Section
    * Can choose/set his training types from a set list
    * Can choose/set his training areas from a set list
    * Can set his charging price for a training session
  * 'My Calendar' Section
    * Can view his training sessions in a calendar form
  * 'My Account' Section
    * Can upload a profile photo
    * Can also upload a description about himself which appears on his profile page
* __Admin__
  * Can view all users/trainers
  * Can send a message to any user/trainer and view his/her sent/received personal messages 
  * Can 'ban' an active user/trainer and 'reactivate' a 'banned' user/trainer

## Other Notes
Each user is notified upon login for any new messages. 
A trainer is also notified for any new training sessions someone has booked with him and for any new training sessions that have been cancelled.
The notification icon only appears if there are any new events.
