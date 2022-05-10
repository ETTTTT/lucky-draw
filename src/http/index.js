import axios from 'axios';

export const heroList = async function() {
  const url =
    'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js';
  return await axios
    .get(url, {
      params: {
        v: 42
      }
    })
    .then(function(response) {
      return response.data.hero;
    })
    .catch(function(error) {
      console.log(error);
    });
};
