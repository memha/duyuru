document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("document-search");
  const filter = document.getElementById("document-filter");
  const cards = [...document.querySelectorAll(".document-card")];
  const count = document.getElementById("document-count");
  const empty = document.getElementById("empty-documents");

  function filterDocuments() {
    const term = (search?.value || "").toLocaleLowerCase("tr-TR").trim();
    const kind = filter?.value || "all";
    let visible = 0;
    cards.forEach((card) => {
      const text = (card.dataset.search + " " + card.innerText).toLocaleLowerCase("tr-TR");
      const show = (kind === "all" || card.dataset.kind === kind) && text.includes(term);
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = visible + " belge listeleniyor";
    empty.hidden = visible !== 0;
  }
  search?.addEventListener("input", filterDocuments);
  filter?.addEventListener("change", filterDocuments);

  document.getElementById("current-year").textContent = new Date().getFullYear();

  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeButton = modal?.querySelector(".modal-close");
  const imageWrap = modal?.querySelector(".modal-image-wrap");
  let lastTrigger = null;

  function openImage(button) {
    lastTrigger = button;
    modalImage.src = button.dataset.image;
    modalImage.alt = button.dataset.alt || "Sınav güzergâh haritası";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeButton?.focus();
  }
  function closeImage() {
    if (!modal?.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
    lastTrigger?.focus();
  }
  document.querySelectorAll(".route-card[data-image]").forEach((button) => {
    button.addEventListener("click", () => openImage(button));
  });
  closeButton?.addEventListener("click", closeImage);
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeImage();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeImage();
  });

  // Store checklist progress locally only for the current page view.
  document.querySelectorAll(".check-item input").forEach((input) => {
    input.addEventListener("change", () => {
      const item = input.closest(".check-item");
      item?.classList.toggle("is-checked", input.checked);
    });
  });
});