'use strict';

import images from './gallery-items.js';

document.addEventListener("DOMContentLoaded", () => {
  const galleryRef = {
    gallery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
  };

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
      galleryRef.gallery.appendChild(galleryItem);
    });
  }
  createGallery();

  const showModal = (event) => {
    event.preventDefault();
    const { target } = event;
    const imgSrc = target.closest('.gallery__image').dataset.source;
    const imgAlt = target.alt;
    galleryRef.lightboxImage.setAttribute('src', imgSrc);
    galleryRef.lightboxImage.setAttribute('alt', imgAlt);
    galleryRef.modal.classList.add('is-open');
  };

  const hideModal = (event) => {
    const { target } = event;

    if(target.nodeName !== 'IMG') {
      galleryRef.modal.classList.remove('is-open');
      galleryRef.lightboxImage.setAttribute('src', "");
      galleryRef.lightboxImage.setAttribute('alt', "");
    }
  };

  const hideModalWithEsc = (event) => {

    if(event.code === 'Escape') {
      galleryRef.modal.classList.remove('is-open');
    }
  };

  galleryRef.gallery.addEventListener('click', showModal);
  galleryRef.modal.addEventListener('click', hideModal);
  document.addEventListener('keydown', hideModalWithEsc);
});