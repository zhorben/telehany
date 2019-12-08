
import google from 'passport-google-oauth20'
import authenticate from './authenticate'
import config from '../../../../config/default'
import get from 'lodash/get'

export default new google.Strategy({
  clientID: config.providers.google.appId,
  clientSecret: config.providers.google.appSecret,
  callbackURL: config.server.siteHost + '/oauth/google',
  // fields are described here:
  // https://developers.facebook.com/docs/graph-api/reference/v2.7/user
  profileFields: ['email', 'gender', 'displayName'],
  session: false,
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile)
  authenticate('facebook', get(profile, 'emails[0].value'), profile.displayName, done)
})
