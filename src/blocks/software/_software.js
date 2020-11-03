import inView from 'in-view';

inView('.js-software').once('enter', (element) => {
  element.classList.add('in-view');
});
