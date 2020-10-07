export const convertToCelsius = temp => {
  return Math.round(temp - 273.15);
};

export const calculateWind = ms => {
  return Math.floor(ms * 1.94384);
};

export const formatDate = string => {
  const day = string.slice(8, 10);
  const month = string.slice(5, 7);
  const date = `${day}/${month}`;
  const hour = string.slice(11, 13);
  return { date, hour };
};

export const filterCityList = (wordToMatch, list) => {
  return list.filter(city => {
    const regEx = new RegExp(`^${wordToMatch}`, "gi");
    return city.name.match(regEx);
  });
};

export const removeCityDuplicates = array => {
  return array.filter((item, index) => {
    return (
      array.findIndex(
        entry => entry.name === item.name && entry.country === item.country
      ) === index
    );
  });
};
