let auth = require('../../controllers/auth.js');
var User = require('../../models/User');
var jwt = require('jwt-simple');
let request = require('request');
let config = require('../../services/config.js');

describe('controller auth', () => {
    describe('facebook', () => {
        
        beforeEach(() => {
            config.facebookTokenUrl = 'http://facebook.com/tokens';
            config.facebookGraphUrl = 'http://facebook.com/graph';
            config.facebookClientSecret = 'myClientSecret';
        });
        
        it('finds an existing user by facebook id and responds with a token', () => {
            let callCount = 0;
            let resSendParams;
            
            let req = { body: {
                code: 'myCode',
                clientId: 'myClientId',
                redirectUri: 'myRedirectUri'
            }};
            
            let res = {
                send: (params) => {
                    resSendParams = params;
                }
            };
            
            spyOn(request, 'get').and.callFake((paramObject, callback) => {
                callCount++;
                
                if (callCount == 1) {
                    let expectedParamObject = {
                        url: 'http://facebook.com/tokens',
                        qs: {
                            code: 'myCode',
                            client_id: 'myClientId',
                            client_secret: 'myClientSecret',
                            redirect_uri: 'myRedirectUri'
                        },
                        json: true
                    };

                    expect(paramObject).toEqual(expectedParamObject);

                    callback(undefined, {statusCode: 200}, 'myAccessToken');
                    
                } else if (callCount == 2) {
                    let expectedParamObject = {
                        url: 'http://facebook.com/graph?fields=id,email',
                        qs: 'myAccessToken',
                        json: true
                    };
                
                    expect(paramObject).toEqual(expectedParamObject);

                    callback(undefined, {statusCode: 200}, {id: 'myFacebookId', email: 'myFacebookEmail'});
                }
            });
            
            spyOn(User, 'findOne').and.callFake((query, callback) => {
                let expectedQuery = {facebook: 'myFacebookId'};
                
                expect(query).toEqual(expectedQuery);
                
                callback(undefined, { _id: 'existingUserId' });
            });
            
            spyOn(jwt, 'encode').and.callFake((payload) => {
                expect(payload.sub).toEqual('existingUserId');
                
                return 'myEncodedToken';
            });
            
            auth.facebook(req, res);
            
            expect(resSendParams).toEqual({token: 'myEncodedToken'});
        });
        
        it('creates a new user with email and facebook id and responds with a token', () => {
            let callCount = 0;
            let resSendParams;
            
            let req = { body: {
                code: 'myCode',
                clientId: 'myClientId',
                redirectUri: 'myRedirectUri'
            }};
            
            let res = {
                send: (params) => {
                    resSendParams = params;
                }
            };
            
            spyOn(request, 'get').and.callFake((paramObject, callback) => {
                callCount++;
                
                if (callCount == 1) {
                    let expectedParamObject = {
                        url: 'http://facebook.com/tokens',
                        qs: {
                            code: 'myCode',
                            client_id: 'myClientId',
                            client_secret: 'myClientSecret',
                            redirect_uri: 'myRedirectUri'
                        },
                        json: true
                    };

                    expect(paramObject).toEqual(expectedParamObject);

                    callback(undefined, {statusCode: 200}, 'myAccessToken');
                    
                } else if (callCount == 2) {
                    let expectedParamObject = {
                        url: 'http://facebook.com/graph?fields=id,email',
                        qs: 'myAccessToken',
                        json: true
                    };

                    expect(paramObject).toEqual(expectedParamObject);

                    callback(undefined, {statusCode: 200}, {id: 'myFacebookId', email: 'myFacebookEmail'});
                }
            });
            
            spyOn(User, 'findOne').and.callFake((query, callback) => {
                let expectedQuery = {facebook: 'myFacebookId'};
                
                expect(query).toEqual(expectedQuery);
                
                callback(undefined, null);
            });
            
            // TODO: not sure how to mock mongoose model instantiation
            
            spyOn(User.prototype, 'save').and.callFake((callback) => {
                callback();
            });
            
            spyOn(jwt, 'encode').and.callFake((payload) => {
                return 'myEncodedToken';
            });
            
            auth.facebook(req, res);
            
            expect(resSendParams).toEqual({token: 'myEncodedToken'});
            expect(User.prototype.save).toHaveBeenCalled();
        });
    });
    
    describe('google', () => {
        
        beforeEach(() => {
            config.googleTokenUrl = 'http://google.com/tokens';
            config.googlePeopleUrl = 'http://google.com/people';
            config.googleClientSecret = 'myClientSecret';
        });
        
        it('finds an existing user by google id and responds with a token', () => {
            let resSendParams;
            
            let req = { body: {
                code: 'myCode',
                clientId: 'myClientId',
                redirectUri: 'myRedirectUri'
            }};
            
            let res = {
                send: (params) => {
                    resSendParams = params;
                }
            };
            
            spyOn(request, 'post').and.callFake((accessTokenUrl, paramObject, callback) => {
                let expectedParamObject = {
                    json: true,
                    form: {
                        code: 'myCode',
                        client_id: 'myClientId',
                        client_secret: 'myClientSecret',
                        redirect_uri: 'myRedirectUri',
                        grant_type: 'authorization_code'
                    }
                };
                
                expect(paramObject).toEqual(expectedParamObject);
                
                callback(undefined, undefined, {access_token: 'myAccessToken'});
            });
            
            spyOn(request, 'get').and.callFake((paramObject, callback) => {
                let expectedParamObject = {
                    url: 'http://google.com/people',
                    headers: {Authorization: 'Bearer myAccessToken'},
                    json: true
                };
                
                expect(paramObject).toEqual(expectedParamObject);
                
                callback(undefined, undefined, {sub: 'myGoogleId', email: 'myGoogleEmail'});
            });
            
            spyOn(User, 'findOne').and.callFake((query, callback) => {
                let expectedQuery = {google: 'myGoogleId'};
                
                expect(query).toEqual(expectedQuery);
                
                callback(undefined, { _id: 'existingUserId' });
            });
            
            spyOn(jwt, 'encode').and.callFake((payload) => {
                expect(payload.sub).toEqual('existingUserId');
                
                return 'myEncodedToken';
            });
            
            auth.google(req, res);
            
            expect(resSendParams).toEqual({token: 'myEncodedToken'});
        });
        
        it('creates a new user with email and facebook id and responds with a token', () => {
            let resSendParams;
            
            let req = { body: {
                code: 'myCode',
                clientId: 'myClientId',
                redirectUri: 'myRedirectUri'
            }};
            
            let res = {
                send: (params) => {
                    resSendParams = params;
                }
            };
            
            spyOn(request, 'post').and.callFake((accessTokenUrl, paramObject, callback) => {
                let expectedParamObject = {
                    json: true,
                    form: {
                        code: 'myCode',
                        client_id: 'myClientId',
                        client_secret: 'myClientSecret',
                        redirect_uri: 'myRedirectUri',
                        grant_type: 'authorization_code'
                    }
                };
                
                expect(paramObject).toEqual(expectedParamObject);
                
                callback(undefined, undefined, {access_token: 'myAccessToken'});
            });
            
            spyOn(request, 'get').and.callFake((paramObject, callback) => {
                let expectedParamObject = {
                    url: 'http://google.com/people',
                    headers: {Authorization: 'Bearer myAccessToken'},
                    json: true
                };
                
                expect(paramObject).toEqual(expectedParamObject);
                
                callback(undefined, undefined, {sub: 'myGoogleId', email: 'myGoogleEmail'});
            });
            
            spyOn(User, 'findOne').and.callFake((query, callback) => {
                let expectedQuery = {google: 'myGoogleId'};
                
                expect(query).toEqual(expectedQuery);
                
                callback(undefined, null);
            });
            
            // TODO: not sure how to mock mongoose model instantiation
            
            spyOn(User.prototype, 'save').and.callFake((callback) => {
                callback();
            });
            
            spyOn(jwt, 'encode').and.callFake((payload) => {
                return 'myEncodedToken';
            });
            
            auth.google(req, res);
            
            expect(resSendParams).toEqual({token: 'myEncodedToken'});
            expect(User.prototype.save).toHaveBeenCalled();
        });
    });
});