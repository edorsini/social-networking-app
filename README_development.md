# Setting Up the Dev Environment

## Requirements:

- Git _(must be installed)_
- install Brackets or preferred IDE

## Steps to install: 

Step 1: **`git clone https://github.com/edorsini/social-networking-app.git`**

Step 2: **`git checkout development`**

Step 4: **`brew update`**

Step 5: **`brew upgrade`**

Step 6: **`brew install node`**

Step 6: **`brew install mongo`**

Step 7: **`npm install -g gulp bower jasmine`**

### Front-End:

Step 8: Change directories: `cd front-end`, Then **`npm install`**

Step 9: **`bower install`** _(may need `npm config set prefix /usr/local` before this command)_

Step 10: **`gulp`**

### Back-End:

Step 11: Change directories: `cd back-end`, Then **`npm install`**

Step 12: Copy configuration/secrets.example.json to configuration/dev/secrets.json. See **README_oauth
for information on filling the values for this file.

## Steps to run the application:

### To run front-end:

**`gulp serve`**

Note: If any new dependencies have been added you'll need to rerun 'npm install' or 'bower install'

### To run back-end:

- get latest configuration secrets from team google drive and add to back-end/configuration directory
- open a terminal and type **`mongod`** _(may need `sudo mongod` instead)_
- open another terminal and type **`mongo`** _(may need `sudo mongo` instead)_
- open another terminal and navigate to back end directory and type **`node server`**

Note: If any new dependencies have been added you'll need to rerun 'npm install'

### To test login:
From the login page, change the URL to /auth-test. This displays a backdoor form for registration/login
using email/password rather than Facebook/Google authentication. See **README_oauth** for information
on configuring OAuth.

### To test front-end or back-end:

Change to directory and run **`npm test`**

## Steps to release:

We do all our work on the development branch. At the end of the iteration, we commit our updated
documentation files to the `docs` folder, and merge the branch into master:

* `git checkout master`
* `git pull`
* `git merge development`
* `git push`
