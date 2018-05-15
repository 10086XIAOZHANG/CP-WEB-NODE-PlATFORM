import localForage from 'localforage';

export const config = {
  name: 'WEBEND',
  storeName: 'webend',
  driver: localForage.INDEXEDDB,
};

// load state from localForage
export const loadState = (item) => {
  return localForage.getItem(item).then(str => (str ? JSON.parse(str) : {}));
};

// load state from localStorage
export const loadLocalState = (item) => {
  try {
    const serializedState = localStorage.getItem(item);
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};
