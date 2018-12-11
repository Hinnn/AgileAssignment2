# Assignment 2 - Web API - Automated development process.

Name: Yue Wang

## Overview.

Based on assignment1, this assignment include Build automation, Continuous Integration by using travis and Published Test results on coveralls. The code was published on GitHub, and the link is: https://github.com/Hinnn/AgileAssignment2.git

## API endpoints.

 + GET /bookings - Get all bookings.
 + GET /bookings/:customerID - Get a booking with the specific customerID.
 + POST /bookings/:customerID - Add a booking with specific customerID.
 + PUT /bookings/:customerID/amount - Edit the amount of the customer's booking.
 + DELETE /bookings/:customerID - Delete a booking by customerID.
 + GET /bookings/:amount - Get total amount of bookings.
 + GET /rooms - Get all rooms.
 + GET /rooms/:roomNum - Get a room with the specific roomNum.
 + POST /rooms - Add a room.
 + PUT /rooms/:roomNum/price - Edit the price of the room.
 + DELETE /rooms/:roomNumID - Delete a room by roomNum.
 + POST /customers - Customer sign up.
 + POST /customers/:email - Customer log in.
 + GET /customers - Get all customers.
 + GET /customers/:customerID - Get a customer with the specific customerID.
 + DELETE /customers/:customerID - Delete a customer by customerID.

## Continuous Integration and Test results.

. . . URL of the Travis build page for web API, 

    https://travis-ci.org/Hinnn/AgileAssignment2


. . . URL of published test coverage results on Coveralls,

    https://coveralls.io/github/diarmuidoconnor/donationsAPI
[![Coverage Status](https://coveralls.io/repos/github/Hinnn/AgileAssignment2/badge.svg?branch=development)](https://coveralls.io/github/Hinnn/AgileAssignment2?branch=development)



## Extra features.
. . . In this assignment, I successfully deal with the problem with Travis and published the results on it.
