let auth = require('../../controllers/auth.js');
var User = require('../../models/user');
var jwt = require('jwt-simple');
let request = require('request');

describe('controller auth', () => {
    describe('facebook', () => {
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
                        url: 'https://graph.facebook.com/v2.5/oauth/access_token',
                        qs: {
                            code: 'myCode',
                            client_id: 'myClientId',
                            client_secret: undefined,
                            redirect_uri: 'myRedirectUri'
                        },
                        json: true
                    }

                    expect(paramObject).toEqual(expectedParamObject);

                    callback(undefined, {statusCode: 200}, 'myAccessToken');
                    
                } else if (callCount == 2) {
                    let expectedParamObject = {
                        url: 'https://graph.facebook.com/v2.5/me?fields=id,email',
                        qs: 'myAccessToken',
                        json: true
                    }

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
    });
});