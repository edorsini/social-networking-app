var controller = require('../../controllers/wallPost');
var WallPost = require('../../models/wallPost');

describe('controller wallPost', () => {
    describe('get', () => {
        it('returns all wall posts for given userId populated with posters', () => {
            let findResult = {
                populate: () => {}
            };
            let populateResult = {
                exec: () => {}
            };
            let expectedResponse = [
                { post: 'post one' },
                { post: 'post two'}
            ];
            
            spyOn(WallPost, 'find').and.returnValue(findResult);
            spyOn(findResult, 'populate').and.returnValue(populateResult);
            spyOn(populateResult, 'exec').and.callFake(callback => callback(undefined, expectedResponse));
            
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
            expect(findResult.populate).toHaveBeenCalledWith('poster', '-pwd');
        });
        
        it('sends 500 response on db error', () => {
            let findResult = {
                populate: () => {}
            };
            let populateResult = {
                exec: () => {}
            };
            
            spyOn(WallPost, 'find').and.returnValue(findResult);
            spyOn(findResult, 'populate').and.returnValue(populateResult);
            spyOn(populateResult, 'exec').and.callFake(callback => callback('big trouble', undefined));
            
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
                user: {id: 'the poster'}
            };

            let resStatus;
            let res = {
                sendStatus: params => resStatus = params
            };

            spyOn(WallPost.prototype, 'save').and.callFake(callback => callback(undefined));

            controller.post(req, res);

            expect(resStatus).toEqual(200);
            expect(req.body).toEqual({
                message: 'the message',
                userId: 'the user',
                poster: {
                    id: 'the poster'
                }
            });
        });
        
        it('sends 500 response on db error', () => {
            let req = {
                params: {
                    userId: 'the user'
                },
                body: {
                    message: 'the message'
                },
                user: {id: 'the poster'}
            };

            let resStatus;
            let res = {
                sendStatus: params => resStatus = params
            };

            spyOn(WallPost.prototype, 'save').and.callFake(callback => callback('big trouble'));

            controller.post(req, res);

            expect(resStatus).toEqual(500);
        });
    });
});