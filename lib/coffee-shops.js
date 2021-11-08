import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const fetchCoffeePhotos = async (query) => {
  const fetchedPhotos = await unsplashApi.search.getPhotos({
    query,
    per_page: 10,
    orientation: "landscape",
  });
  const unsplashPhotos = fetchedPhotos.response.results.map(
    (result) => result.urls["small"]
  );
  return unsplashPhotos;
};

const fetchCoffeeShops = async (term, location, limit) => {
  const photos = await fetchCoffeePhotos(term);
//   console.log(photos)
  const token = `Bearer ${process.env.YELP_ACCESS_TOKEN}`;
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=${limit}`;

  const settings = {
    headers: { Authorization: token },
  };
  const response = await fetch(url, settings);
  const data = await response.json();
//   return data.businesses;
  return data.businesses.map((business, idx) => ({
    ...business,
    img: photos[idx],
  }));
};

export default fetchCoffeeShops;
