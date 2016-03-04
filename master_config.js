/**
 * Created by Michal on 2016-02-19.
 *
 * Sets configuration parameters and exports them where required
 *
 */
let api_url = process.env.API_URL || 'https://omicronserver.herokuapp.com';
let github_repo_url = 'https://github.com/MichalKononenko/OmicronClient';
let waffle_url = "https://waffle.io/MichalKononenko/OmicronClient";
let esdoc_url = "https://doc.esdoc.org/github.com/MichalKononenko/OmicronClient/";

module.exports = {
    api_url: api_url,
    github_repo_url: github_repo_url,
    waffle_url: waffle_url,
    esdoc_url: esdoc_url
};
