# @btfcss/modal

**A lightweight modal manager for [Beautiful CSS](https://your-css-toolkit-link.com), using native HTML `<dialog>` elements.**



## Installation

```bash
npm install @btfcss/modal
```


## Usage

### HTML Structure

Modals use the native `<dialog>` element and must include the `modal` class. The child container must have the `modal-content` class.

```html
<dialog id="example-modal" class="modal" data-close-modal>
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

#### Events

This library exposes four events :

| Event | Description |
| onModalShow | This event fires immediately when the show instance method is called. If caused by a click, the clicked element is available as the relatedTarget property of the event.


## Full Example



Explore a working demo on [CodeSandbox](https://codesandbox.io/p/sandbox/npm-playground-forked-jq6vcd)


## Requirements

* Works best with Beautiful CSS, but it's not required.
* Assumes browser support for `<dialog>` (modern browsers only).
