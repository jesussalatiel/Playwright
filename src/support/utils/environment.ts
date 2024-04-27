export const setDocumentNumber = () => {
  let randomNumber: number;
  const min = 10000000;
  const max = 99999999;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (String(randomNumber)[0] === '0');

  return String(randomNumber);
};
export const setCountryCode = () => {
  const countryCode = '+52';
  return `${countryCode}`;
};

export const setMobilePhoneNumber = () => {
  const mobileNumberLength = 9;
  let mobileNumber = '9';

  for (let i = 1; i < mobileNumberLength; i++) {
    const digit = Math.floor(Math.random() * 10);
    mobileNumber += digit.toString();
  }

  return String(mobileNumber);
};
