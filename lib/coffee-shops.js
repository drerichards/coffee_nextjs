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
    const dummyImg =
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80";
  const photos = await fetchCoffeePhotos(term);
  const token = `Bearer ${process.env.YELP_ACCESS_TOKEN}`;
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=${limit}`;

  const settings = {
    headers: { Authorization: token },
  };
  const response = await fetch(url, settings);
  const data = await response.json();
  return data.businesses.map((business, idx) => ({
    id: business.id,
    name: business.name,
    location: business.location,
    rating: business.rating,
    img: photos[idx] || dummyImg,
  }));
};

export default fetchCoffeeShops;