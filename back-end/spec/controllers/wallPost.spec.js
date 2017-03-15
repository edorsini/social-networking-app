var controller = require('../../controllers/wallPost');
var WallPost = require('../../models/wallPost');

describe('controller wallPost', () => {
    describe('get', () => {
        it('returns all wall posts populated with users', () => {
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
            spyOn(populateResult, 'exec').and.callFake((callback) => {
                callback(undefined, expectedResponse);
            });
            
            let resSendParams;
            let res = {
                send: (params) => {
                    resSendParams = params;
                }
            };
            
            controller.get(undefined, res);
            
            expect(resSendParams).toEqual(expectedResponse);
            expect(WallPost.find).toHaveBeenCalledWith({});
            expect(findResult.populate).toHaveBeenCalledWith('user', '-pwd');
        });
    });
    
    describe('post', () => {
        it('saves a wall post and returns 200', () => {
            let req = {
                body: {},
                user: {id: '123'}
            };

            let resStatus;
            let res = {
                sendStatus: (params) => {
                    resStatus = params;
                }
            };

            spyOn(WallPost.prototype, 'save');

            controller.post(req, res);

            expect(resStatus).toEqual(200);
            expect(WallPost.prototype.save).toHaveBeenCalled();
            expect(req.body.user).toEqual({id: '123'});
        });
    });
});