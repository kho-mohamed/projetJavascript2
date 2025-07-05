export const divSupprime = (divCible) => {
  const div = document.querySelector(divCible);
  div.style.transition = "opacity 0.5s ease-in-out";
  div.style.opacity = "0";
  setTimeout(() => {
    div.remove();
  }, 500);
};
