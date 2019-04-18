## Cab Modelling Problem
 A modelling server in NodeJS and web app which solves the problem of allocation of a cab to the requesting user and make the cab available for next ride when a ride ends.

 ## Steps to start the app
    - npm install
    - source run

## Below are the rest api points accessible
 - /cab - POST - create cabs
    - body can be the below attributes
        - latitude
        - longitude
        - type - can be null or "pink"

 -  /cab/:id - PUT - edit cab data
    - id param is the cab id
    - body can have below attributes
     - latitude
     - longitude
     - assigned

 - /cab/assign/:latitude/:longitude/:type - PUT - assign cab to a user
    - params are
        - latitude of user
        - longitude of user
        - type can be null or "pink"
    