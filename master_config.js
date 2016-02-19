/**
 * Created by Michal on 2016-02-19.
 *
 * Sets configuration parameters and exports them where required
 *
 */
let api_url;

if (process.env.API_URL === undefined){
    api_url = 'http://omicronserver.herokuapp.com';
} else {
    api_url = process.env.API_URL;
}

module.exports = {
        api_url: api_url
    };