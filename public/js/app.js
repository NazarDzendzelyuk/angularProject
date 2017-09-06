function onLoadFunction() {
    gapi.client.setApiKey('AIzaSyBVeupNW5Lu5nqKDMGTQHP2x9GI9tY7oso');
    gapi.client.load('plus', 'v1', function () {})
}

window.fbAsyncInit = function() {
            FB.init({
                appId: '470543913344855',
                xfbml: true,
                version: 'v2.10'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
