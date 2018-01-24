let userAccessToken = '',
    regExAccessToken = /access_token=([^&]*)/,
    regExExpiresIn = /expires_in=([^&]*)/,
    clientId = '6bf60ee5d5654b61b20bd16e9a195522',
    redirectURI = 'http://arul-jammming.surge.sh';

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
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(function(track) {
                   return {
                       id: track.id,
                       name: track.name,
                       artist: track.artists[0].name,
                       album: track.album.name,
                       uri: track.uri
                   } 
                });
            }  else {
                return [];
            }
        });
    },
    
    savePlaylist: function(playlistName, trackURIs) {
        let accessToken = Spotify.getAccessToken();
        let headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        let userID,
            playlistID;
        return fetch(`https://api.spotify.com/v1/me`,{headers: headers}).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName})
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            }, networkError => {
                console.log(networkError.message);
            }).then(jsonResponse => {
                playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackURIs})
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Request Failed!');
                }, networkError => {
                    console.log(networkError.message);
                }).then(jsonResponse => {
                    window.alert("Playlist Added.");
                    return jsonResponse;
                })
            });
        });
    }
}

export default Spotify;