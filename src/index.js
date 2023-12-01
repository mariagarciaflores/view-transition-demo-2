import "../style.css";
import { getAllCats } from "./firestore-calls/calls";

(() => {
  const loadGallery = () => {
    getAllCats()
      .then((cats) => document.startViewTransition(() => updateDOMCatGallery(cats)))
      .catch((error) => console.error("Error", error));
  };

  const updateDOMCatGallery = (cats) => {
    const catGalleryElement = document.getElementById("cat-gallery");

    cats.forEach((catDoc) => {
      let catInfo = catDoc.data();

      let listItem = document.createElement("li");
      let catImage = document.createElement("img");

      listItem.classList.add("cat-image");

      catImage.src = catInfo.url;
      catImage.alt = catInfo.description;

      listItem.appendChild(catImage);

      catGalleryElement.appendChild(listItem);
    });
  };

  loadGallery();
})();
