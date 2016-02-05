# Omicron Client #

Front end for the Omicron System

## Badges ##

Travis CI Build

* Build Status [![Build Status](https://travis-ci.org/MichalKononenko/OmicronServer.svg?branch=master)](https://travis-ci.org/MichalKononenko/OmicronServer)
* Coveralls Code Coverage Report [![Coverage Status](https://coveralls.io/repos/MichalKononenko/OmicronClient/badge.svg?branch=master&service=github)](https://coveralls.io/github/MichalKononenko/OmicronClient?branch=master)
* License [![License](https://img.shields.io/badge/License-GNU%20GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
* Dependency Status [![Dependency Status](https://david-dm.org/MichalKononenko/OmicronClient.svg)](https://david-dm.org/MichalKononenko/OmicronClient)
* CodeClimate [![Code Climate](https://codeclimate.com/github/MichalKononenko/OmicronClient/badges/gpa.svg)](https://codeclimate.com/github/MichalKononenko/OmicronClient)
* Project Management [![Stories in Ready](https://badge.waffle.io/MichalKononenko/OmicronClient.svg?label=ready&title=Ready)](http://waffle.io/MichalKononenko/OmicronClient)
* Docs [![Documentation](https://doc.esdoc.org/github.com/MichalKononenko/OmicronClient/badge.svg)](https://doc.esdoc.org/github.com/MichalKononenko/OmicronClient/)

## Development Machine ##

The master branch of this repository is built and hosted on 
[omicronclient.herokuapp.com](omicronclient.herokuapp.com)

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

### Installing for Development ###

