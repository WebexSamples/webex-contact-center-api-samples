export const theDOMElementFactory = (type, attributes) => {
  const element = document.createElement(type);

  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  return element;
};

// const ionIcons = document.createElement("script");
// ionIcons.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
// ionIcons.type = "module";
// ionIcons.defer = true;
// document.head.append(ionIcons);
// const ionIconsJS = document.createElement("script");
// ionIconsJS.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
// ionIconsJS.defer = true;
// document.head.append(ionIconsJS);
