import axios from "axios";

const YOUR_ACCESS_KEY = `GNRWArJRKATBMBu5zqp9Fz4Kc6RiOIyNUnP4RCEh5Lg`;

export const fetchArticles = async (query, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/photos/?client_id=${YOUR_ACCESS_KEY}&query=${query}&page=${page}&count=20`
  );
  console.log(query, page);
  console.log(response.data);
  return response.data;
};
// export const fetchArticlesById = async () => {
//   const response = await axios.get('http://hn.algolia.com/api/v1/search?query=react');
//   return response.data;
// };
//&query=${query}&page=${page}
