# modal

This npm package is a library for managing Beautiful CSS modals.

## Install 

Import the package

```bash
npm i @btfcss/modal
```

## Usage

### HTML

This package is designed to work with the Beautiful CSS toolkit. 
Modals are based on the `dialog` HTML tag: 

``` html
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
The `dialog` child tag must have the `modal-content` class. 

When the element with the attribute `data-close-modal` is clicked, the current modal is closed. 

The element with the attribute `data-open-modal` opens the modal with the ID as attribute value. 

``` html
<button data-open-modal="example-modal">Launch demo modal</button>
```

### CSS

The package expect animation on opening and closing the modal. The animation must be set to the class `modal-is-opening` and `modal-is-closing`. Here is an example:

``` css
.modal.modal-is-opening {
  animation: modal-animation 300ms;
}

.modal.modal-is-closing {
  animation: modal-animation reverse 200ms;
}

@keyframes modal-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Open Modal

The function `openModal(id)` open the modal with a given ID. If another modal is currently opened, it is closed prior to the opening

```js
import { openModal } from "@btfcss/modal";

// Open the modal
openModal ('example-modal');
```

### Close Modal

The function `closeModal(id)` close the modal with a given ID. 

```js
import { closeModal } from "@btfcss/modal";

// Open the modal
closeModal ('example-modal');
```


### Toggle Modal

The function `toggleModal(id)` toggle the modal with a given ID. 

```js
import { toggleModal } from "@btfcss/modal";

// Open the modal
toggleModal ('example-modal');
```

## Full Example

A full example is available on [Code Sandbox](https://codesandbox.io/p/sandbox/npm-playground-forked-jq6vcd)