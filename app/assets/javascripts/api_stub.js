/**
 * Created by kaceyryan on 5/2/15.
 */
var request = require('request');
var host = window.location.host;
var imagesUri = `http://${host}/images`;

class API {
  //get images in JSON object for your location
  getImages(callback, errorCallback) {
    if (!navigator.geolocation) {
      return errorCallback("Geolocation is not supported by this browser.");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      request.get({
        url: imagesUri,
        qs: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(JSON.parse(body));
        } else if (error) {
          errorCallback(`An error occurred: ${error}`);
        } else {
          errorCallback("Response returned with bad status");
        }
      });
    }, this.handleGeolocationError);
  }

  //post an image for your provided location
  postImage(imageUri, callback, errorCallback) {
    if (!navigator.geolocation) {
      return errorCallback("Geolocation is not supported by this browser.");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      request.post({
        url: imagesUri,
        qs: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        formData: {
          image: imageUri,
        },
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          callback();
        } else if (error) {
          errorCallback(`An error occurred: ${error}`);
        } else {
          errorCallback("Response returned with bad status");
        }
      });
    }, this.showError);
  }

  //get whether you have upvote the post yet in json object
  getUpvote(id, callback, errorCallback) {
    var query = `${host}/images/${id}/up`;
    request.get(query, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  //get whether you have downvoted the post in json
  getDownvote(id, callback, errorCallback) {
    var query = `${host}/images/${id}/down`;
    request.get(query, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  //upvote the image with the given id
  postUpvote(id, callback, errorCallback) {
    var query = `${host}/images/${id}/up`;
    request.post(query, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback();
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  //downvote the image with the given id
  postDownvote(id, callback, errorCallback) {
    var query = `${host}/images/${id}/down`;
    request.post(query, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback();
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  handleGeolocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        //x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        //x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        //x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        //x.innerHTML = "An unknown error occurred."
        break;
    }
  }
}

module.exports = new API();
