
const s4 = (): string =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const Guid = (): string => {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

export const Guid8 = (): string => {
  return s4() + s4();
};

export const Guid16 = (): string => {
  return s4() + s4() + s4() + s4();
};
