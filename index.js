'use strict';

import images from './gallery-items.js';

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector('.js-gallery');
  const modal = document.querySelector('.js-lightbox');
  const lightboxImage = document.querySelector('.lightbox__image');

  const createGallery = () => {
    images.map(image => {
      let galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery__item');
      let galleryLink = document.createElement('a');
      galleryLink.classList.add('gallery__link');
      galleryLink.setAttribute('href', image.original);
      let galleryImage = document.createElement('img');
      galleryImage.classList.add('gallery__image');
      galleryImage.setAttribute('src', image.preview);
      galleryImage.setAttribute('data-source', image.original);
      galleryImage.setAttribute('alt', image.description);
      galleryLink.appendChild(galleryImage);
      galleryItem.appendChild(galleryLink);
      gallery.appendChild(galleryItem);
    });
  }
  createGallery();

  const showModal = (elem) => {
    lightboxImage.setAttribute('src', elem.dataset.source);
    lightboxImage.setAttribute('alt', elem.alt);
    modal.classList.add('is-open');
  };

  const hideModal = () => {
    modal.classList.remove('is-open');
    lightboxImage.setAttribute('src', "");
    lightboxImage.setAttribute('alt', "");
  }

  document.body.addEventListener('click', (event) => {
    event.preventDefault();
    const { target } = event;

    showModal(target);

    if (target.nodeName !== 'IMG') {
      hideModal();
   }
  })
});