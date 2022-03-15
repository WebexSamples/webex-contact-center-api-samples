//function to reduce selecting
export const select = q => {
  const els = document.querySelectorAll(q);
  if (els.length > 1) {
    return els;
  } else if (els.length == 1) {
    return els[0];
  }
};
