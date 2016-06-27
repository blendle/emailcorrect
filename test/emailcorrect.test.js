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
  });
});
