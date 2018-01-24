let userAccessToken = '',
    regExAccessToken = '/access_token=([^&]*)/',
    regExExpiresIn = '/expires_in=([^&]*)/',
    clientId = '6bf60ee5d5654b61b20bd16e9a195522',
    redirectURI = 'http://localhost:3000/';

let Spotify = {
    getAccessToken: function() {
        if (userAccessToken) {    
            return userAccessToken;
        } else if (!userAccessToken) {
           let url = window.location.href,
               checkAccessToken = url.match(regExAccessToken),
               checkExpiresIn = url.match(regExExpiresIn);
           if (checkAccessToken && checkExpiresIn) {
               userAccessToken = checkAccessToken[1];
               let expiresIn = Number(checkExpiresIn[1]);
               window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
               window.history.pushState('Access Token', null, '/');
               return userAccessToken;
           } else {
               let userAuthenticationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
               window.location = userAuthenticationUrl;
           }
        }
    },
    
    search: function(term) {
        let getUserAccessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${getUserAccessToken}`
            }
        }).then(response => {
            console.log(response.json());
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.map(function(track) {
                   return {
                       id: track.id,
                       name: track.name,
                       artist: track.artist[0].name,
                       album: track.album.name,
                       uri: track.uri
                   } 
                });
            }  else {
                return [];
            }
        });
    }
}

export default Spotify;