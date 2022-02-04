import './betting';

const betting = new Betting();

export const getMatches = (live) => new Promise((resolve, reject) => {
  
  // const betting = new Betting(live);

  betting
    .auth({
      client_id: 'marketing-1a49fe24c1af4278c541a52a3c2ffca7',
      client_secret: 'xJM$*Pf1eD#K4Gb@!Od5V@iTLWR6dbVFKVfghjU!YH#pe0Cc18&TsEVC*RH3XQya',
      ref: 51,
    })
    .then((token) => {
      betting
        .get_matches({
          lng: 'ru',
          sportids: '1',
          oddsIds: '1, 2, 3',
        }, live)
        .then((matches) => resolve(matches.items))
        .catch((err) => reject(err));
    })
    .catch((err) => reject(err));
});