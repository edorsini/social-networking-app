var controller = require('../../controllers/message');
var Message = require('../../models/message');

describe('controller message', () => {
    describe('get', () => {
        it('returns all messages populated with users', () => {
            let findResult = {
                populate: () => {}
            };
            let populateResult = {
                exec: () => {}
            };
            let expectedResponse = { message: 'Hi' };
            
            spyOn(Message, 'find').and.returnValue(findResult);
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
            expect(Message.find).toHaveBeenCalledWith({});
            expect(findResult.populate).toHaveBeenCalledWith('user', '-pwd');
        });
    });
    
    describe('post', () => {
        it('saves a message and returns 200', () => {
            spyOn(Message.prototype, 'save');
            
            let req = {
                body: {},
                user: {id: '123'}
            };
            
            // TODO: not sure how to mongoose model instantiation
            
            let resStatus;
            let res = {
                sendStatus: (params) => {
                    resStatus = params;
                }
            };
                        
            controller.post(req, res);
            expect(resStatus).toEqual(200);
            expect(Message.prototype.save).toHaveBeenCalled();
            expect(req.body.user).toEqual({id: '123'});
        });
    });
});