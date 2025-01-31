import axios from "axios";

const YOUR_ACCESS_KEY = `GNRWArJRKATBMBu5zqp9Fz4Kc6RiOIyNUnP4RCEh5Lg`;

export const fetchArticles = async (query, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${YOUR_ACCESS_KEY}`
  );
  console.log(query, page);
  console.log(response);
  return response.data;
};
// export const fetchArticlesById = async () => {
//   const response = await axios.get('http://hn.algolia.com/api/v1/search?query=react');
//   return response.data;
// };
//&query=${query}&page=${page}
