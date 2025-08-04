// Events
const eventOpen = new Event("onModalOpen");
const eventOpened = new Event("onModalOpened");
const eventClose = new Event("onModalClose");
const eventClosed = new Event("onModalClosed");

// Prevent adding listener twice
let listenerClickAttached = false;
let listenerKeydownAttached = false;


/**
 * Initialize global event listeners.
 * This function sets up handlers for click and keydown events.
 * It should be called once after the DOM is ready.
 */
const setupListeners = () => {
  handleClick();
  handleKeyDown();
}


/**
 * Handles modal interactions:
 * - Opens a modal when an element with [data-open-modal] is clicked
 * - Closes a modal when an element with [data-close-modal] is clicked
 * - Supports clicking outside the modal to close it (if implemented in `closeModal`)
 */
const handleClick = () => {
  
  // Prevent attaching listener twice
  if (listenerClickAttached) return;
  listenerClickAttached = true;

  document.body.addEventListener('click', (event) => {

    // Check if modal target attribute exists
    const closestElement = event?.target?.closest('[data-open-modal]');
    if (closestElement) {
      openModal(closestElement.dataset.openModal, closestElement);
      event.preventDefault();
    }

    // Check if modal close attribute exists
    if (event?.target?.matches('[data-close-modal]')) {
      // If a modal is opened, close the modal
      const openedModalId = document.querySelector('.modal[open')?.id;
      if (openedModalId) {
        closeModal(openedModalId, event.target);
        event.preventDefault();
      }
    }
  });
}

/**
 * Handles global Escape key presses to close the currently open modal.
 * 
 * - Listens for 'keydown' events on the document body
 * - When Escape is pressed:
 *   - Finds any <dialog class="modal"> with the [open] attribute
 *   - Closes it using closeModal()
 *   - Prevents default Escape behavior (like exiting fullscreen or triggering native dialog cancel)
 */
const handleKeyDown = () => {
  
  // Prevent attaching listener twice  
  if (listenerKeydownAttached) return;
  listenerKeydownAttached = true;

  document.body.addEventListener('keydown', function (event) {
    // If the Escape key is pressed
    if (event.key === 'Escape') {
      // Find the active modal
      const openModal = document.querySelector('.modal[open]');
      if (openModal) {
        // Close the modal
        closeModal(openModal.id, event);
        // prevent default escape behavior (like exiting fullscreen or cancel current modal)
        event.preventDefault();
      }
    }
  });
}

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
  const openedModalId = document.querySelector('.modal[open')?.id;
  if (openedModalId && id == openedModalId) return;

  // If a modal is currently opened, close the modal before opening the new one
  if (openedModalId) { closeModal(openedModalId, triggerElement, id); return; }

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

    modalEl.addEventListener('cancel', onEscapeKeyPressed, { 'once': true })

  }, { once: true });

  // Show the modal (and trigger the  animation)
  modalEl.showModal();




  // Scroll to top of modal if requested
  if (modalEl.dataset.scrollTo === 'top') {
    modalEl.querySelector('.modal-content').scrollTo(top);
  }
}


/**
 * Handles the Escape key press event to close a modal.
 * Shouldn't be called because the Escape key is trigger before the cancel event
 * May be useful on other source of cancelation than Escape
 *
 * @param {object} event - The keyboard event triggered by the Escape key.
 * @returns {void}
 */
const onEscapeKeyPressed = (event) => {
  // If the event is not cancelable,
  if (!event.cancelable) {
    return;
  }

  // The modal is cancelable, run the animation
  event.preventDefault();
  closeModal(event.target.id, null, null);

}


/**
 * Close the modal with a given ID
 * @param {string} id ID of the modal
 * @param {HTMLElement} [triggerElement] The element that triggered the modal closing (optional).
 * @param {string} [next] ID of the next modal to open (toogle) (optional)
 */
export const closeModal = (id, triggerElement, next) => {

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

    // Open the next modal if required
    if (next) openModal(next, triggerElement);
  }, { once: true });


  // Remove the event listener
  modalEl.removeEventListener('cancel', onEscapeKeyPressed);

}




// Export the modal utility module
const modalModule = {
  handleClick,
  handleKeyDown,
  setupListeners,
  openModal,
  closeModal,
  toggleModal
};

export default modalModule;