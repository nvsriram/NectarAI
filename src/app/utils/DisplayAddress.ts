export const displayAddress = (address: string, numChars = 4) => {
  if (address.length < numChars * 2) {
    return address;
  }
  return `${address.slice(0, numChars)}...${address.slice(-numChars)}`;
};
