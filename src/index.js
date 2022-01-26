import './css/styles.css';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PictureApiService from './js/picture-service.js';
import LoadMoreBtn from './js/btn.js';


const refs = {
  searchFormEl: document.querySelector('#search-form'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  endOfResult: document.querySelector('.end-of-results')
};

const pictureApiService = new PictureApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
let gallery = new SimpleLightbox('.gallery a');

refs.searchFormEl.addEventListener('submit', onSubmitSearchForm);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onLoadMore() {
  fetchPictures();
}

function onSubmitSearchForm(e) {
  e.preventDefault();

  enableIntersectionObserver();

  const searchQuery = e.currentTarget.elements.searchQuery.value;
  pictureApiService.query = searchQuery;
  pictureApiService.resetPage();
  clearGalleryContainer();
  fetchPictures();
  loadMoreBtn.show();
  
}
  
function fetchPictures() {
  refs.endOfResult.classList.add("is-hidden");
  loadMoreBtn.disable();
  
  return pictureApiService.fetchPictures()
    .then(response => {
      const { hits } = response;
      const page = response.totalHits / 40;
     
      if (response.totalHits === 0) {
         loadMoreBtn.hide();
      }

      if (pictureApiService.page === 1 && response.totalHits != 0) {
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      }
     
      pictureApiService.incrementPage();
      renderPicturesCard(hits);      
      loadMoreBtn.enable();
      gallery.refresh();

      if (pictureApiService.page > page && response.totalHits != 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hide();
         refs.endOfResult.classList.remove("is-hidden");
        return;
      }
    })
}

function renderPicturesCard(pictures) {

  if (pictures.length < 1) {
    refs.gallery.innerHTML = "";
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  }

  const markup = pictures.map(picture => `<div class="photo-card">
  <div class="image-thumb">
  <a href="${picture.largeImageURL}"><img class="photo-card__img" src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy"  /></a>
  </div>
  <div class="info">
    <p class="info-item">
      <b>likes</b>
      <span class="info-text">${picture.likes}</span>
    </p>
    <p class="info-item">
      <b>views </b>
       <span class="info-text">${picture.views}</span>
    </p>
    <p class="info-item">
      <b>comments </b>
      <span class="info-text">${picture.comments}</span>
    </p>
    <p class="info-item">
      <b>downloads</b>
      <span class="info-text">${picture.downloads}</span>
    </p>
  </div>
</div>`).join("");
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = "";
}

function enableIntersectionObserver() {
  const options = {
    root: window.document,
    threshold: 1,
  };
  const handleObserver = ([item]) => {
    if (!loadMoreBtn.refs.button.disabled && item.isIntersecting) {
      onLoadMore();
    }
  };
  const observer = new IntersectionObserver( handleObserver, options);

  observer.observe(loadMoreBtn.refs.button);
}