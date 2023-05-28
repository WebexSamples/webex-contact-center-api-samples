export function notifications(elementName, text, color) {
  elementName.forEach(async element => {
    element.style.display = "inline-block";
    element.textContent = text;
    element.style.backgroundColor = color;
    setTimeout(() => {
      element.style.display = "none";
    }, 6000);
  });
}
export function notification(element, text, color) {
  element.style.display = "inline-block";
  element.innerHTML = text;
  element.style.backgroundColor = color;
  setTimeout(() => {
    element.style.display = "none";
  }, 10000);
}

export function showLoader(elementName, elementClass) {
  elementName.classList.add(elementClass);
}

export function hideLoader(elementName, elementClass) {
  elementName.classList.remove(elementClass);
}

export function toggleElement(elementName, element) {
  elementName.classList.toggle(element);
}
