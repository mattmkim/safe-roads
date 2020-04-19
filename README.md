# Safe-Roads
CIS 550 (Databases &amp; Info Systems) final project at the University of Pennsylvania that features a website with functionalities for querying and visualizing U.S. accident data with associated weather factors.

## Instructions for Running the Web App
* Step 1: Navigate to the Webapp folder 
* Step 2: Navigate to the web folder and run npm start
* Step 3: Navigate to the server folder and run node server.js

## Instructions for how to run your queries. 
* Step 1: Navigate to the corresponding routes folder and make a new routes.js file. 
* Step 2: Make the new routes file a requirement in server.js and pass in the initialized db instance
* Step 3: Call db.execute with your queries


## Known bugs and how to prevent
* After calling a db command, quitting the server.js file takes a while with control c. Run server.js
* Make sure your queries use a backtik and not a quotation mark. 
* Look at testRoutes as an example for how to write routes
