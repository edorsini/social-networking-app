# OAuth

The application relies on Facebook/Google authentication for login. The original team had created
and configured apps on the Facebook and Google developer platforms, and keeps the client secret
keys in a configuration file stored on the team's Google Drive folder. This document will explain
how to configure new Facebook and Google apps.

## Facebook

1. Follow the instructions on [Satellizer](https://github.com/sahat/satellizer#obtaining-oauth-keys)
(our authentication library) for setting up a Facebook developer app. Note that Facebook only
supports one Site URL per app, so you will eventually need to create two apps, one for development
and one for production.

2. From the Facebook App dashboard, go to App Review and choose to make the app public. Before this
is done, you will only be able to login using your Facebook account, or any test accounts you
set up within the Facebook app.

3. In the `back-end/configuration` directory, copy `secrets.example.json` to `dev/secrets.json`.
Then set `facebookClientSecret` to the App Secret of your Facebook app.

4. In the `front-end/configuration/properties.json` file, set `dev.FACEBOOK_CLIENT_ID` to the App
ID of your Facebook app.

## Google

1. Follow the instructions on [Satellizer](https://github.com/sahat/satellizer#obtaining-oauth-keys)
(our authentication library) for setting up a Google developer app. Google supports multiple URLs
per app, so you will not need to create a separate app for production if you don't want to.

2. In the `back-end/configuration` directory, copy `secrets.example.json` to `dev/secrets.json`.
Then set `googleClientSecret` to the Client Secret of your Google app.

3. In the `front-end/configuration/properties.json` file, set `dev.GOOGLE_CLIENT_ID` to the Client
ID of your Google app.