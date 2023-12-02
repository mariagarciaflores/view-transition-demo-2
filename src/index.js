import "../style.css";
import { getAllCats } from "./firestore-calls/calls";

(() => {
  const loadGallery = () => {
    getAllCats()
      .then((cats) =>
        document.startViewTransition(() => updateDOMCatGallery(cats))
      )
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

      catImage.style.viewTransitionName = `${catInfo.id}`;
      catImage.setAttribute("data-name", `${catInfo.id}`);

      listItem.appendChild(catImage);

      catGalleryElement.appendChild(listItem);

      catImage.addEventListener("click", (e) => {
        increaseImage(e.target);
      });
    });
  };

  function increaseImage(image) {
    const src = image.src;
    const transitionName = image.getAttribute("data-name");

    const imageViewer = document.querySelector("#cat-gallery");

    document
      .startViewTransition(() => {
        imageViewer.innerHTML = `<img src="${src}" width="600" style="view-transition-name:${transitionName}" />`;
      })
  }

  loadGallery();
})();
