const uniqueId = require('../../../commons').both.uniqui;

const expect = require('chai').expect;

describe('Generate ID Unique #test', () => {

    describe('#routine', () => {

        it('when invoking the id generation method requesting integer it must return integer', () => {
            
            expect(uniqueId('intOnly')).to.be.a('number');
        });

        it('when invoking the id generation method requesting string it must return string', () => {
            
            expect(uniqueId('stringOnly')).to.be.a('string');
        });

        it('when invoking the id generation method requesting special characters it must return string', () => {
            
            expect(uniqueId('specialCharactersOnly')).to.be.a('string');
        });

        it('when invoking the id generation method requesting int, string, special characters it must return string', () => {

            expect(uniqueId('intAndStringAndspecialCharacters')).to.be.a('string');
        });
    });

    describe('#exception', () => {
        it('when invoking the ID generation method requesting an empty number, it should return undefined', () => {

            expect(uniqueId()). to.be.an('undefined');
        });
    });
});