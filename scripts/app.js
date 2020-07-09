const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';

$(() => {
  const $stickersContainerEl = $('#stickersContainer');
  const $btnNewSticker = $('#btnCreate');
  const stickersTemplate = $('#stickersTemplate').html();

  new Stickers($btnNewSticker, $stickersContainerEl, stickersTemplate, URL);
});
