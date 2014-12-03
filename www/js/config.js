define(["require", "exports"], function(require, exports) {
  return angular.module("ENV", [])

.constant("GOOGLE_API_URI", "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAR3-1YSkP2LM-HuJshMivhOZuai9L5htM")

.constant("FIREBASE_URI", "https://doresol-dev.firebaseio.com/")

.constant("HOST", "http://doresol.net:8000")

.constant("MEMORIAL_KEY", "-J_yaUS2gsgyLbDtgzQA")

;
});