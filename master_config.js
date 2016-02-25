/**
 * Created by Michal on 2016-02-19.
 *
 * Sets configuration parameters and exports them where required
 *
 */
let api_url;

api_url = process.env.API_URL || 'https://omicronserver.herokuapp.com';

module.exports = {
        api_url: api_url
};