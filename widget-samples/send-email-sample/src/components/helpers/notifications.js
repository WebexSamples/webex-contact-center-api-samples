export function notifications(elementName, text, color) {
  elementName.forEach(async element => {
    element.style.display = "inline-block";
    element.textContent = text;
    element.style.backgroundColor = color;
    setTimeout(() => {
      element.style.display = "none";
    }, 8000);
  });
}
