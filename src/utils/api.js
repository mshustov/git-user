function makeRequest(url) {
    return fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                const error = response.statusText || response.status;
                return Promise.reject(error);
            }
        });
}

function getRepos(userName) {
    throw new Error('oops'); // const url = `https://api.github.com/users/${userName}/repos?type=all&sort=updated&per_page=100`;

    return makeRequest(url);
}

export default {
    getRepos
};
