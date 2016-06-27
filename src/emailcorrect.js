const tldMistakes = {
  com: ['con', 'kom', 'cm', 'cmo', 'cim', 'cpm'],
  nl: ['ml', 'ln', 'nk', 'bl'],
  net: ['nt', 'met'],
};

const hostnameMistakes = {
  gmail: ['gmai', 'gail', 'gmai', 'gnail', 'mgail', 'gmial', 'mgail', 'gamil'],
  hotmail: [
    'htmail', 'otmail', 'hotmal', 'hotmai', 'hotmial', 'hoitmail', 'homail',
    'hotrmail', 'hotmil', 'hotmaill',
  ],
  live: ['lve', 'liv'],
  yahoo: ['yhoo', 'yaho'],
};

function last(value = []) {
  return value[value.length - 1];
}

function butlast(value = []) {
  return value.slice(0, value.length - 1);
}

function disectDomain(domain = '') {
  // Get TLD and hostname from domain.
  const parts = domain.split('.');
  const tld = last(parts);
  const hostname = butlast(parts).join('.');

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
    autoCorrect(hostnameMistakes, hostname),
    autoCorrect(tldMistakes, tld)
  );
}
