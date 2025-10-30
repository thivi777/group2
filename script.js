// small helper so reviewers can test interactive behavior
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(c => {
    c.addEventListener('click', () => {
      c.classList.toggle('highlight');
    });
  });
});
