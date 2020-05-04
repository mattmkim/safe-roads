# Safe-Roads
CIS 550 (Databases &amp; Info Systems) final project at the University of Pennsylvania that features a website with functionalities for querying and visualizing U.S. accident data with associated weather factors.

## Installation
* Install oracle and sqlplus: https://vanwollingen.nl/install-oracle-instant-client-and-sqlplus-using-homebrew-a233ce224bf
* Install sqlldr
* If can't figure out oracle home path using homebrew: https://tomeuwork.wordpress.com/2014/05/12/how-to-install-oracle-sqlplus-and-oracle-client-in-mac-os/
* Or: https://oracle.github.io/odpi/doc/installation.html#macos and move unzipped folder into `/opt/oracle`
Add paths (locally or to zshrc/bashrc): 
`export ORACLE_HOME=/opt/oracle/instantclient_19_3`
`export DYLD_LIBRARY_PATH=$ORACLE_HOME`
`export LD_LIBRARY_PATH=$ORACLE_HOME`
`export PATH=$ORACLE_HOME:$PATH`

## Instructions for Running the Web App
* Step 1: Navigate to the Webapp folder 
* Step 2: To run the above 2 commands concurrently (in development only) run `npm run dev`
* Step 2.1: Navigate to the web folder and run `npm install` and `npm start`
* Step 2.2: Navigate to the server folder and run `npm install` and `node server.js`

## Instructions for how to run your queries. 
* Step 1: Navigate to the corresponding routes folder and make a new routes.js file. 
* Step 2: Make the new routes file a requirement in server.js and pass in the initialized db instance
* Step 3: Call db.execute with your queries

## Instruction for Deployment
* `git subtree push --prefix WebApp heroku master`

## Known bugs and how to prevent
* After calling a db command, quitting the server.js file takes a while with control c. Run server.js
* Make sure your queries use a backtik and not a quotation mark. 
* Look at testRoutes as an example for how to write routes
* When query has SQL syntax error have to restart server.