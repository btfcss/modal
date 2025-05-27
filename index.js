let currentModalId = null;

// Events
const eventOpen = new Event("onModalOpen");
const eventOpened = new Event("onModalOpened");
const eventClose = new Event("onModalClose");
const eventClosed = new Event("onModalClosed");


document.body.addEventListener('click', (event) => {

  // Check if modal target attribute exists
  if (event.target.matches('[data-open-modal]')) openModal(event.target.dataset.openModal, event.target);

  // Check if modal close attribute exists
  if (event.target.matches('[data-close-modal]')) closeModal(currentModalId);

});


/**
 * Toggle the modal with a given ID
 * @param {string} id ID of the modal
 * @param {HTMLElement} [triggerElement] The element that triggered the modal toggle (optional).
 */
export const toggleModal = (id, triggerElement) => {
  const modal = document.getElementById(id);
  if (modal.open) closeModal(id, triggerElement);
  else openModal(id);
};



/**
 * Open the modal with a given ID
 * @param {string} id ID of the modal
 * @param {HTMLElement} [triggerElement] The element that triggered the modal opening (optional).
 */
export const openModal = (id, triggerElement) => {

  // If the modal is already opened, do nothing
  if (id == currentModalId) return;

  // If a modal is currently opened, close the modal before opening the new one
  if (currentModalId) { closeModal(currentModalId, id); return; }

  // Dispatch the show event
  const modalEl = document.getElementById(id);
  eventOpen.triggerElement = triggerElement;
  modalEl.dispatchEvent(eventOpen);

  // Add the animation class
  modalEl.classList.add('modal-is-opening');

  // Event listener on animation end (only once)
  modalEl.addEventListener('animationend', () => {

    // The modal is visible, remove the class
    modalEl.classList.remove('modal-is-opening');

    // Dispatch the shown event
    eventOpened.triggerElement = triggerElement;
    modalEl.dispatchEvent(eventOpened);
  
  }, { once: true });
  
  // Show the modal (and trigger the  animation)
  modalEl.showModal();

  // Scroll to top of modal if requested
  if (modalEl.dataset.scrollTo === 'top')
    modalEl.querySelector('.modal-content').scrollTo(top);

  // Set the modal as current modal
  currentModalId = id;
}



/**
 * Close the modal with a given ID
 * @param {string} id ID of the modal
 * @param {HTMLElement} [triggerElement] The element that triggered the modal closing (optional).
 */
export const closeModal = (id, next) => {

  // Trigger the hide event
  const modalEl = document.getElementById(id);
  modalEl.dispatchEvent(eventClose);

  // Add the animation class
  modalEl.classList.add("modal-is-closing");

  // Event listener on animation end (only once)
  modalEl.addEventListener('animationend', () => {

    // The modal is hidden, remove the class
    modalEl.classList.remove('modal-is-closing')

    // Close the modal
    modalEl.close();

    // Dispatch the hidden event
    modalEl.dispatchEvent(eventClosed);

    // No modal opened
    currentModalId = null;

    // Open the next modal if required
    if (next) openModal(next);
  }, { once: true });
}



// Export the modal utility module
const modalModule = {
  openModal,
  closeModal,
  toggleModal
};

export default modalModule;