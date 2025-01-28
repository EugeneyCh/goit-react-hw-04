import axios from "axios";

export const fetchArticles = async (query, page) => {
  const response = await axios.get(
    `http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`
  );
  return response.data;
};
// export const fetchArticlesById = async () => {
//   const response = await axios.get('http://hn.algolia.com/api/v1/search?query=react');
//   return response.data;
// };
