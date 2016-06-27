const tldMistakes = {
  com: ['con', 'kom', 'cm', 'cmo', 'cim', 'cpm'],
  nl: ['ml', 'ln', 'nk', 'bl'],
  net: ['nt', 'met'],
  'tante.nel': ['nel'],
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

function disect(email) {
  // Split up into user and domain.
  const parts = email.split('@');
  const user = parts[0];
  const domain = parts[1];

  // Get TLD and hostname from domain.
  const domainParts = domain && domain.split('.');
  const tld = domainParts && domainParts.pop();
  const hostname = domainParts && domainParts.join('.');

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

  return compile(user,
    autoCorrect(hostnameMistakes, hostname),
    autoCorrect(tldMistakes, tld)
  );
}
