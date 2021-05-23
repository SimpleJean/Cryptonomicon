const API_KEY =
  'e6b63855916383f0d75c35a6041518b0250ca24350d84caae42da7a2fcd8c9ad';

const tickersHandlers = new Map();
//TODO: refactor to use URLSearchParams

const loadtickersHandlers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsym==${[
      ...tickersHandlers.key(),
    ].join(',')}&tsyns=USD&&api_key=${API_KEY}`
  )
    .then((r) => r.json())
    .then((rawData) => {
      const updatePrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      );

      tickersHandlers.get()
    });
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = ticker.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(
    ticker,
    subscribers.filter((fn) => fn !== cb)
  );
};

setInterval(loadtickersHandlers, 5000);
