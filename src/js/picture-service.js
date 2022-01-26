const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api';

export default class PictureApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    
  }

  async fetchPictures() {
    const url = `${BASE_URL}/?key=25379025-3c5974e106307fb7265817a17&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const response = await axios.get(url);
    return response.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

}