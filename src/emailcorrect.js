const TLD_MISTAKES = {
  com: ['con', 'kom', 'cm', 'cmo', 'cim', 'cpm'],
  nl: ['ml', 'ln', 'nk', 'bl'],
  net: ['nt', 'met'],
};

const HOSTNAME_MISTAKES = {
  gmail: ['gmai', 'gail', 'gmai', 'gnail', 'mgail', 'gmial', 'mgail', 'gamil'],
  hotmail: [
    'htmail', 'otmail', 'hotmal', 'hotmai', 'hotmial', 'hoitmail', 'homail',
    'hotrmail', 'hotmil', 'hotmaill',
  ],
  live: ['lve', 'liv'],
  yahoo: ['yhoo', 'yaho'],
};

function disectDomain(domain = '') {
  // Get TLD and hostname from domain.
  const parts = domain.split('.');
  const tld = parts.pop();
  const hostname = parts.join('.');

  return { hostname, tld };
}

function disect(email = '') {
  // Split up into user and domain.
  const [user, domain] = email.split('@');
  const { hostname, tld } = disectDomain(domain);

  return { user, hostname, tld };
}

function compile(user, hostname, tld) {
  return `${user}@${hostname}.${tld}`;
}

function autoCorrect(mistakes, input) {
  return Object.keys(mistakes).reduce((acc, solution) => {
    const mistakesForSolution = mistakes[solution];

    if (mistakesForSolution.includes(input)) {
      return solution;
    }

    return acc;
  }, input);
}

export function suggest(email) {
  const { user, hostname, tld } = disect(email);

  if (!user || !hostname || !tld) {
    return email;
  }

  return compile(
    user,
    autoCorrect(HOSTNAME_MISTAKES, hostname),
    autoCorrect(TLD_MISTAKES, tld)
  );
}
