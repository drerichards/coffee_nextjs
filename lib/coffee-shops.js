const fetchCoffeeShops = async (term, location, limit) => {
  const token = `Bearer ${process.env.ACCESS_TOKEN}`;
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=${limit}`;

  const settings = {
    headers: { Authorization: token },
  };
  const response = await fetch(url, settings);
  const data = await response.json();
  return data.businesses;
};

export default fetchCoffeeShops
