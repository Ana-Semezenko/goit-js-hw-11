import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function addImg(arrImg) {
  render.insertAdjacentHTML('beforeend', htmlImg(arrImg.hits).join(''));

  let gallerySet = new simpleLightbox('.gallery a', {
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  gallerySet.on('show.simplelightbox', function () {});
}

function htmlImg(arrImg) {
  return arrImg.map(img => {
    return `<div class="photo-card">
                <a class="gallery__item" href="${img.largeImageURL}">
                  <img class="gallery__image" src="${img.webformatURL}" loading="lazy" title ='${img.tags}'  alt="${img.tags}" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${img.likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${img.views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${img.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${img.downloads}
                    </p>
                </div>
            </div>`;
  });
}
