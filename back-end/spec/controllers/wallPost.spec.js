var controller = require('../../controllers/wallpost');
var WallPost = require('../../models/WallPost');
var Profile = require('../../models/Profile');

describe('controller wallPost', () => {
    describe('get', () => {
        it('returns all wall posts for given userId populated with posters', () => {
            let findResult = {
                populate: () => {}
            };
            let populatePoster = {
                populate: () => {}
            };
            let populateCommenter = {
                exec: () => {}
            };
            let expectedResponse = [
                { post: 'post one' },
                { post: 'post two'}
            ];
            
            spyOn(WallPost, 'find').and.returnValue(findResult);
            spyOn(findResult, 'populate').and.returnValue(populatePoster);
            spyOn(populatePoster, 'populate').and.returnValue(populateCommenter);
            spyOn(populateCommenter, 'exec').and.callFake(callback => callback(undefined, expectedResponse));
            
            let req = {
                params: {
                    userId: 'the user'
                }
            };
            
            let resSendParams;
            let res = {
                send: params => resSendParams = params
            };
            
            controller.get(req, res);
            
            expect(resSendParams).toEqual(expectedResponse);
            expect(WallPost.find).toHaveBeenCalledWith({userId: 'the user'});
            expect(findResult.populate).toHaveBeenCalledWith('poster');
            expect(populatePoster.populate).toHaveBeenCalledWith('comments.user');
        });
        
        it('sends 500 response on db error', () => {
            let findResult = {
                populate: () => {}
            };
            let populatePoster = {
                populate: () => {}
            };
            let populateCommenter = {
                exec: () => {}
            };
            
            spyOn(WallPost, 'find').and.returnValue(findResult);
            spyOn(findResult, 'populate').and.returnValue(populatePoster);
            spyOn(populatePoster, 'populate').and.returnValue(populateCommenter);
            spyOn(populateCommenter, 'exec').and.callFake(callback => callback('big trouble', undefined));
            
            let req = {
                params: {
                    userId: 'the user'
                }
            };
            
            let resSendParams;
            let res = {
                sendStatus: params => resSendParams = params
            };
            
            controller.get(req, res);
            
            expect(resSendParams).toEqual(500);
        });
    });
    
    describe('post', () => {
        it('saves a wall post and returns 200', () => {
            let req = {
                params: {
                    userId: 'the user'
                },
                body: {
                    message: 'the message'
                },
                user: {
                    id: 'the poster'
                }
            };

            let resStatus;
            let res = {
                sendStatus: params => resStatus = params
            };
            
            let profile = { data: 'profile data' };
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                expect(query).toEqual({user: {id: 'the poster'}});
                
                callback(undefined, profile);
            });

            spyOn(WallPost.prototype, 'save').and.callFake(callback => callback(undefined));

            controller.post(req, res);

            expect(resStatus).toEqual(200);
            expect(req.body.message).toEqual('the message');
            expect(req.body.userId).toEqual('the user');
            expect(req.body.poster).toEqual({ data: 'profile data' });
            expect(req.body.dateAndTime).not.toBeNull();
        });
        
        it('sends 500 response on Profile find error', () => {
            let req = {
                params: {
                    userId: 'the user'
                },
                body: {
                    message: 'the message'
                },
                user: {
                    id: 'the poster'
                }
            };

            let resStatus;
            let res = {
                sendStatus: params => resStatus = params
            };
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                callback('Error!', undefined);
            });

            controller.post(req, res);

            expect(resStatus).toEqual(500);
        });
        
        it('sends 400 response with message on Profile find no result', () => {
            let req = {
                params: {
                    userId: 'the user'
                },
                body: {
                    message: 'the message'
                },
                user: {
                    id: 'the poster'
                }
            };

            let resStatus;
            let resMessage;
            let res = {
                status: function (params) {
                    resStatus = params;
                    return this;
                },
                send: params => resMessage = params
            };
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                callback(undefined, undefined);
            });

            controller.post(req, res);

            expect(resStatus).toEqual(400);
            expect(resMessage).toEqual({ message: 'Profile required to make wall posts' });
        });
        
        it('sends 500 response on WallPost save error', () => {
            let req = {
                params: {
                    userId: 'the user'
                },
                body: {
                    message: 'the message'
                },
                user: {
                    id: 'the poster'
                }
            };

            let resStatus;
            let res = {
                sendStatus: params => resStatus = params
            };
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                callback(undefined, {});
            });

            spyOn(WallPost.prototype, 'save').and.callFake(callback => callback('big trouble'));

            controller.post(req, res);

            expect(resStatus).toEqual(500);
        });
    });
});