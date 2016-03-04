# Omicron Client #

Front end for the Omicron System

## Badges ##

The following are reports from various automated codebase monitoring systems.
Each one is linked to their respective service.

* [![Build Status](
    https://travis-ci.org/MichalKononenko/OmicronClient.svg?branch=master)
    ](https://travis-ci.org/MichalKononenko/OmicronClient) Build Status 
* [![Coverage Status](
    https://coveralls.io/repos/MichalKononenko/OmicronClient/badge.svg?branch=master&service=github)
    ](https://coveralls.io/github/MichalKononenko/OmicronClient?branch=master)
    Coveralls Code Coverage Report 
* [![License](
    https://img.shields.io/badge/License-GNU%20GPL%20v3-blue.svg)
    ](https://www.gnu.org/licenses/gpl-3.0.en.html)
    License
* [![Dependency Status](
    https://david-dm.org/MichalKononenko/OmicronClient.svg)
    ](https://david-dm.org/MichalKononenko/OmicronClient)
    Dependency Status 
* [![Code Climate](
    https://codeclimate.com/github/MichalKononenko/OmicronClient/badges/gpa.svg)
    ](https://codeclimate.com/github/MichalKononenko/OmicronClient)
    [codeclimate](www.codeclimate.com) automated code-quality reports
* [![Stories in Ready](
    https://badge.waffle.io/MichalKononenko/OmicronClient.svg?label=ready&title=Ready)
    ](http://waffle.io/MichalKononenko/OmicronClient)
    Project Management
* [![Documentation](
    https://doc.esdoc.org/github.com/MichalKononenko/OmicronClient/badge.svg)
    ](https://doc.esdoc.org/github.com/MichalKononenko/OmicronClient/)
    Docs

## Development Machine ##

A build of the latest ```master``` branch of this repository is hosted on 
[omicronclient.herokuapp.com](http://www.omicronclient.herokuapp.com)

## Installation ##

Installation is dependent on whether you want to configure this project
for development, testing, or production. The state of the application is
controlled by the ```NODE_ENV``` environment variable. On Linux / OSX / any
Unix-like operating system, the value can be set using

```bash
    export NODE_ENV=testing
```

On Windows machines, this can be done using

```bash
    set NODE_ENV=testing
```

If the variable is unset, this app will assume that the value is 
```development```. If deploying to a production machine, this will result in
unneeded instrumenters and development features (such as hot loading) to be
added to the output code.

### Installation Requirements ###

1. [Git](https://git-scm.com)
2. [Node.js](https://nodejs.org/en/)
3. [Node Package Manager (npm)](https://www.npmjs.com/)
    (Should come bundled with node)


#### Optional ####
1. [GitHub Desktop](https://desktop.github.com/) is a useful front end for the
    command-line based git version control system. 

### Installing for Development ###
1.a) If you do not have push access to this repository, fork it and clone that
    repo into your machine. At that point, keeping your code up to date with
    this project is your responsibility. To request push access to this repo,
    please open up an issue in the issue tracker.
    
1.b) If you do have push access, clone this repo onto your system by running
```bash
    git clone https://github.com/MichalKononenko/OmicronClient.git
```
    
2. ```cd``` into your cloned repo and ```npm install``` the JavaScript
    libraries on which this site depends.

3. Open a new command line, ```cd``` into the repository, and set the 
    ```NODE_ENV``` environment variable to ```test```. This can be done using
    
    ```bash
    export NODE_ENV=test
    ```
    
    or
    ```bash
    set NODE_ENV=test
    ```
    
    if you're on a Windows machine.
    
4. In this window, run 
    ```bash 
    karma start --single-run=false
    ```
   
   and give it a few moments to spin up. This will run the unit test suite for
   the app, and rerun the test suite every time any code is changed in the
   repository. Make sure the unit tests pass before sending in a pull request.
   If you make a code change, change the test as well.
   
5. Open a new command line, ```cd``` into the repository, and run

    ```bash
    node .\node_modules\webpack-dev-server\bin\webpack-dev-server.js --inline --hot
    ```
    This will start up a new webpack-dev-server that will automatically build
    your Javascript code, and serve it to you on ```localhost:8080```. It will
    also preserve the state of your React components. Every time a code
    change is made, the website will refresh to reflect the change. It does,
    however, take a few seconds for the site to refresh.

### Installing for Production ###

1. After installing the required hard dependencies for this project, clone
    this repository by running

    ```bash
        git clone https://github.com/MichalKononenko/OmicronClient.git
    ```

    in your command line
    
2. ```cd``` into your cloned repo and run

    ```bash
        npm install
    ```

    This will create a directory called ```node_modules``` where this project's
    Javascript dependencies will be loaded

3. Set the ```NODE_ENV``` environment variable to ```production``` by running

    ```bash
        export NODE_ENV=production
    ```

    on Unix-like operating systems, or
    
    ```bash
        SET NODE_ENV=production
    ```
    
    on Windows machines.

4. Run

    ```bash
        npm run compile
    ```

    This will create a directory called ```dist```, where the minified code,
    as well as any resources required for this site to work will be stored.

5. Serve this directory to users with a server of your choice, or through
    webpack-dev-server, for cases where scale is not required.