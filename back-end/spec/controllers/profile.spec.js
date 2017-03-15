var controller = require('../../controllers/profile');
var Profile = require('../../models/profile');

describe('controller profile', () => {
    describe('get', () => {
        it('finds the user profile and returns it', () => {
            let req = {
                user: {id: '123'}
            };
            
            let resSendParams;
            let res = {
                send: (params) => {
                    resSendParams = params;
                }
            };
            
            let expectedProfile = {name: 'Johnny'};
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                callback(undefined, expectedProfile);
            });
            
            controller.get(req, res);
            
            expect(resSendParams).toEqual(expectedProfile);
            expect(Profile.findOne).toHaveBeenCalledWith({user: {id: '123'}}, jasmine.any(Function));
        });
    });
    
    describe('post', () => {
        it('updates an existing profile and returns 200', () => {
            let req = {
                body: {
                    username: 'jdawg',
                    firstname: 'Johnny',
                    lastname: 'Appleseed',
                    gender: 'M',
                    birthday: '9/26/1774',
                    country: 'US'
                },
                user: {id: '123'}
            };
            
            let resStatus;
            let res = {
                sendStatus: (params) => {
                    resStatus = params;
                }
            };
            
            let profile = {
                save: () => {}
            };
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                callback(undefined, profile);
            });
            
            spyOn(profile, 'save');
            
            controller.post(req, res);
            
            expect(req.body.user).toEqual({id: '123'});
            expect(resStatus).toEqual(200);
            expect(Profile.findOne).toHaveBeenCalledWith({user: {id: '123'}}, jasmine.any(Function));
            expect(profile.save).toHaveBeenCalled();
            expect(profile.username).toEqual('jdawg');
            expect(profile.firstname).toEqual('Johnny');
            expect(profile.lastname).toEqual('Appleseed');
            expect(profile.gender).toEqual('M');
            expect(profile.birthday).toEqual('9/26/1774');
            expect(profile.country).toEqual('US');
        });
        
        it('creates a new profile and returns 200', () => {
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
            
            spyOn(Profile, 'findOne').and.callFake((query, callback) => {
                callback(undefined, null);
            });
            
            // TODO: not sure how to mock mongoose model initialization
            spyOn(Profile.prototype, 'save');
            
            controller.post(req, res);
            
            expect(req.body.user).toEqual({id: '123'});
            expect(resStatus).toEqual(200);
            expect(Profile.findOne).toHaveBeenCalledWith({user: {id: '123'}}, jasmine.any(Function));
            expect(Profile.prototype.save).toHaveBeenCalled();
        })
    });
});