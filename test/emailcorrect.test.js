import { expect } from 'chai';
import { suggest } from '../src/emailcorrect';

describe('emailcorrect', () => {
  describe('#suggest()', () => {
    it('should suggest the correct the top level domain', () => {
      expect(suggest('jesse@hotmail.con')).to.equal('jesse@hotmail.com');
    });

    it('should suggest the correct the hostname', () => {
      expect(suggest('jesse@hotmial.com')).to.equal('jesse@hotmail.com');
    });

    it('should suggest the correct both the hostname and top level domain', () => {
      expect(suggest('jesse@hotmial.con')).to.equal('jesse@hotmail.com');
    });

    it('should return the input string if there are no suggestions', () => {
      expect(suggest('jesse@hotmail.com')).to.equal('jesse@hotmail.com');
    });

    it('should return the input string if the user with @ is missing', () => {
      expect(suggest('hotmial.con')).to.equal('hotmial.con');
    });

    it('should return the input string if the user without @ is missing', () => {
      expect(suggest('@hotmial.con')).to.equal('@hotmial.con');
    });

    it('should return the input string if the TLD is missing', () => {
      expect(suggest('jesse@hotmial')).to.equal('jesse@hotmial');
    });

    it('should return the input string if the hostname is missing', () => {
      expect(suggest('jesse@.con')).to.equal('jesse@.con');
    });

    it('should return undefined if the supplied argument is undefined', () => {
      expect(suggest(undefined)).to.equal(undefined);
    });

    it('should return null if the supplied argument is null', () => {
      expect(suggest(null)).to.equal(null);
    });

    it('should return false if the supplied argument is false', () => {
      expect(suggest(false)).to.equal(false);
    });
  });
});
