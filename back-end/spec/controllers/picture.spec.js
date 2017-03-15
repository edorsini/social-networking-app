var controller = require('../../controllers/picture');
var Picture = require('../../models/picture');

describe('controller picture', () => {
    describe('get', () => {
        it('returns all pictures pouplated with users', () => {
            let findResult = {
                populate: () => {}
            };
            let populateResult = {
                exec: () => {}
            };
            let expectedResponse = [
                { picture: 'some/file.png' },
                { picture: 'another/file.png'}
            ];
            
            spyOn(Picture, 'find').and.returnValue(findResult);
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
            expect(Picture.find).toHaveBeenCalledWith({});
            expect(findResult.populate).toHaveBeenCalledWith('user', '-pwd');
        });
    });
    
    describe('post', () => {
        it('saves the picture and returns 200', () => {
            let expectedFile = {
                originalName: 'original.png',
                filename: 'file.png',
                path: 'some/path/',
                destination: 'some/destination/',
                size: 100,
                mimetype: 'someMimeType'
            };
            
            let req = {
                file: expectedFile,
                body: {},
                user: {id: '123'}
            };
            
            let resSendParams;
            let resStatus;
            let res = {
                send: (params) => {
                    resSendParams = params;
                },
                status: (params) => {
                    resStatus = params;
                }
            };
            
            // TODO: not sure how to mock mongoose model instantiation
            
            spyOn(Picture.prototype, 'save');
            
            controller.post(req, res);
            
            expect(resSendParams).toEqual(expectedFile);
            expect(resStatus).toEqual(200);
            expect(Picture.prototype.save).toHaveBeenCalled();
            expect(req.body.user).toEqual({id: '123'});
        });
    });
});