export class Dispatch {
  constructor() {
    this.send = '';
    this.numberPages = 1;
    this.pages = 40;
  }
  async fetchImg(send, numberPages) {
    const info = new URLSearchParams({
      key: '25379025-3c5974e106307fb7265817a17',
      q: this.send,
      orientation: 'horizontal',
      safesearch: true,
      image_type: 'photo',
      page: this.numberPages,
      per_page: this.pages,
    });
    const url = `https://pixabay.com/api/?${info}`;
    const result = await fetch(url);
    return result.json();
  }

  get inputValue() {
    return this.send;
  }

  set inputValue(newSend) {
    if (newSend === '') {
      console.error('Error!');
      return;
    }
    this.send = newSend;
  }

  nextPages() {
    this.numberPages += 1;
  }
  startPages() {
    this.numberPages = 1;
  }
}
