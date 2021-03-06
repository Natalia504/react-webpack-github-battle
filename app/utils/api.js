const axios = require('axios');

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(({ data }) => data);
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
    return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
}

function calculateScore({ followers }, repos) {
    return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
    console.warn(error)
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function (data) {
        var profile = data[0];
        var repos = data[1];
        return {
            profile: profile,
            sroce: calculateScore(profile, repos)
        }
    })
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

module.exports = {
    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },

    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1language:${language}&sort=stars&order=desc&type=Repositories`);

        return axios.get(encodedURI)
            .then(({ data }) => data.items)
    }
}
