import TLD_MISTAKES from './mistakes/tld';
import HOSTNAME_MISTAKES from './mistakes/hostname';

/**
 * @typedef DomainDisect
 * @type Object
 * @property {string} hostname The hostname part of the e-mail address
 * @property {string} tld The TLD part of the e-mail address
 */

/**
 * Dissects the given domain string into hostname and top level domain parts.
 *
 * @param  {string} [domain='']
 * @return {DomainDisect}
 */
function disectDomain(domain = '') {
  const parts = domain.split('.');
  const tld = parts.pop();
  const hostname = parts.join('.');

  return { hostname, tld };
}

/**
 * @typedef EmailDisect
 * @type Object
 * @property {string} user The user part of the e-mail address
 * @property {string} hostname The hostname part of the e-mail address
 * @property {string} tld The TLD part of the e-mail address
 */

/**
 * Dissects the given email string into user, domain and top level domain parts.
 *
 * @param  {string} email
 * @return {EmailDisect}
 */
function disect(email) {
  const [user, domain] = (email || '').split('@');
  const { hostname, tld } = disectDomain(domain);

  return { user, hostname, tld };
}

/**
 * Compiles the new e-mail address
 *
 * @param  {string} user
 * @param  {string} hostname
 * @param  {string} tld
 * @return {string}
 */
function compile(user, hostname, tld) {
  return `${user}@${hostname}.${tld}`;
}

/**
 * Autocorrects the input value bsaed on the solutions given as the first argument.
 *
 * @example
 * autoCorrect({ gmail: ['gmai', 'gnail'] }, 'gnail'}); // Returns gmail
 * @param  {[type]} mistakes [description]
 * @param  {[type]} input    [description]
 * @return {[type]}          [description]
 */
function autoCorrect(mistakes, input) {
  return Object.keys(mistakes).reduce((acc, solution) => {
    const mistakesForSolution = mistakes[solution];

    if (mistakesForSolution.includes(input)) {
      return solution;
    }

    return acc;
  }, input);
}

/**
 * Creates a suggestion e-mail for the input. Returns an empty string for invalid
 * values. Valid input values are string and number.
 *
 * @param  {(String|Number)} email
 * @return {String}
 */
export function suggest(email) {
  if (typeof email !== 'string' && typeof email !== 'number') {
    return '';
  }

  const emailString = email.toString();
  const { user, hostname, tld } = disect(emailString);

  if (!user || !hostname || !tld) {
    return emailString;
  }

  return compile(
    user,
    autoCorrect(HOSTNAME_MISTAKES, hostname),
    autoCorrect(TLD_MISTAKES, tld)
  );
}
