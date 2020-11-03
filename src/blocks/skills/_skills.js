import inView from 'in-view';

inView.offset(100);

inView('.js-skills').once('enter', (element) => {
  element.classList.add('in-view');
});
