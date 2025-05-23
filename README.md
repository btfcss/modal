# @btfcss/modal

**A lightweight modal manager for [Beautiful CSS](https://your-css-toolkit-link.com), using native HTML `<dialog>` elements.**



## Installation

```bash
npm install @btfcss/modal
```


## Usage

### HTML Structure

Modals use the native `<dialog>` element. The child container must have the `modal-content` class.

```html
<dialog id="example-modal" data-close-modal>
  <div class="modal-content">
    <header>
      <h2 class="mt-0">Example Modal</h2>
    </header>
    <div>
      Whoa There, Cowboy!
    </div>
    <footer>
      <button data-close-modal>Close</button>
    </footer>
  </div>
</dialog>
```

### Triggering Modals

#### Open Modal (HTML)

To open a modal via HTML, use the `data-open-modal` attribute and set its value to the modal's `id`:

```html
<button data-open-modal="example-modal">Launch demo modal</button>
```

#### Close Modal (HTML)

Clicking any element with the `data-close-modal` attribute will close the modal it's in.



### CSS Animations

Animation on opening and closing are **required**. To animate modal transitions, apply styles to the `modal-is-opening` and `modal-is-closing` classes:

```css
.modal.modal-is-opening {
  animation: modal-animation 300ms ease-out;
}

.modal.modal-is-closing {
  animation: modal-animation reverse 200ms ease-in;
}

@keyframes modal-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}
```


### JavaScript API

Import modal control functions from the package:

```js
import { openModal, closeModal, toggleModal } from "@btfcss/modal";
```

#### `openModal(id: string)`

Opens the modal with the given ID. Closes any currently open modal first.

```js
openModal('example-modal');
```

#### `closeModal(id: string)`

Closes the modal with the specified ID.

```js
closeModal('example-modal');
```

#### `toggleModal(id: string)`

Toggles the visibility of the modal.

```js
toggleModal('example-modal');
```



## Modal Events

### Event Summary

The library provides four custom modal-related events that can be used to hook into different stages of the modal's lifecycle:

| **Event**       | **Description**  |
| ---- | ---- |
| `onModalOpen`   | Fired **immediately** when `openModal()` is called. If the modal was triggered by a user action (e.g., a click), the event includes a `triggerElement` property referencing the clicked element. |
| `onModalOpened`  | Fired **after** the modal is fully visible to the user, following the completion of any CSS animations. If triggered by a user action, `triggerElement` will be available in the event object.   |
| `onModalClose`  | Fired **immediately** when `closeModal()` is called. This event occurs before the closing animation starts.                                                                                      |
| `onModalClosed` | Fired **after** the modal is fully hidden, once all CSS animations have completed.                                                               

### Usage Example

You can listen for these events using standard JavaScript:

```js
// Fired when openModal() is called
modalElement.addEventListener('onModalShow', (e) => {
  console.log('Modal is opening');
  if (e.triggerElement) {
    console.log('Triggered by:', e.triggerElement);
  }
});
```

```js
// Fired when modal is fully hidden
modalElement.addEventListener('onModalClosed', () => {
  console.log('Modal has been hidden');
});
```



## Full Example

Explore a working demo on [CodeSandbox](https://codesandbox.io/p/sandbox/npm-playground-forked-jq6vcd)


## Requirements

* Works best with Beautiful CSS, but it's not required.
* Assumes browser support for `<dialog>` (modern browsers only).
