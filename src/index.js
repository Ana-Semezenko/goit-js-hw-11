import './css/styles.css';

import { Dispatch } from './js/class';
import { addImg } from './js/render';
import Notiflix from 'notiflix';
import { remove } from './js/remove';

const render = document.querySelector('#render');
const button = document.querySelector('.load-more');
document.querySelector('#search-form').addEventListener('submit', onFetchForm);
let images = [];

const dispatching = new Dispatch();

async function onFetchForm(e) {
  e.preventDefault();
  button.classList.remove('opasity');
  let valueInput = document.querySelector('#inputimg').value;
  if (valueInput === '') {
    remove(render);
  } else {
    remove(render);
    dispatching.startPages();
    dispatching.inputValue = valueInput;
    try {
      images = await dispatching.fetchImg(dispatching.inputValue, dispatching.numberPages);
      console.log(images);
      addImg(images);
      if (images.totalHits === 0) {
        Notiflix.Notify.warning(`Sorry! We found ${images.totalHits} images.`);
      } else {
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      }
    } catch {
      Notiflix.Notify.error('Error catch');
    }
    if (images.totalHits > dispatching.pages) {
      button.classList.add('opasity');
      button.addEventListener('click', onMoreClick);
      async function onMoreClick() {
        dispatching.nextPages();
        try {
          images = await dispatching.fetchImg(dispatching.inputValue, dispatching.numberPages);
          addImg(images);

          if (images.totalHits / dispatching.pages > dispatching.numberPages) {
            Notiflix.Notify.success(`Hooray! We found more ${dispatching.pages} images.`);
          } else {
            Notiflix.Notify.success(
              `Hooray! We found more ${
                images.totalHits - dispatching.pages * dispatching.numberPages
              } images.`,
            );
          }
        } catch {
          Notiflix.Notify.error('Error');
        }
      }
    }
  }
}
