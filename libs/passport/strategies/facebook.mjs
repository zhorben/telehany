import facebook from 'passport-facebook'
import authenticate from './authenticate'
import config from '../../../../config/default'
import get from 'lodash/get'

export default new facebook.Strategy({
  clientID: config.providers.facebook.appId,
  clientSecret: config.providers.facebook.appSecret,
  callbackURL: config.server.siteHost + '/oauth/facebook',
  profileFields: ['email', 'gender', 'displayName'],
  session: false,
}, (accessToken, refreshToken, profile, done) => {
  authenticate('facebook', get(profile, 'emails[0].value'), profile.displayName, done);
})
