Steps:
1) You require node.js already installed on your machine.
2) Install all the required external npms by running 'npm install' in cmd.
3) After installing run 'node index'. This will run code to fetch API in recursive manner and stream it as data arrives.
4) You can see the csv file genetated in folder named 'output'.
5) The process exists as soon as the code gets executed completely in index.js.


Test case
1) In index.js, comment the code just above module.exports statement and just below garland comment (//*****)(tenatively from line 60, where callFetch has been invoked).
2) Run 'npm test  tests/jsonTocsv.test.js' in command line.
3) You can see test pass once the file is created and written.