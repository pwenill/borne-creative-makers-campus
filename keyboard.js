let Keyboard = window.SimpleKeyboard.default;
let KeyboardLayouts = window.SimpleKeyboardLayouts.default;
let currentFocus = document.querySelector(`.formulaire .input-form`);

const layout = new KeyboardLayouts().get("french");
const options = {
  mergeDisplay: true,
  display: {
    "{bksp}": "⌦",
    "{enter}": "Envoyer",
    "{lock}": "maj",
  },
  layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0 - {bksp}",
      "a z e r t y u i o p",
      "{lock} q s d f g h j k l m",
      "{shift} w x c v b n . /",
      "@ {space} .com",
    ],
    shift: [
      "@ # $ % ^ &amp; _ + {bksp}",
      "A Z E R T Y U I O P",
      "{lock} Q S D F G H J K L M",
      "{shift} W X C V B N ?",
      "@ {space} .com",
    ],
  },
};
let keyboard = new Keyboard("simple-keyboard", {
  onChange: (input) => onChange(input),
  onKeyPress: (input) => onKeyPress(input),
  ...options,
});

$(document).on("focus", '.formulaire .input-form', (e) => {
  document.querySelectorAll(`.formulaire .input-form.focus`).forEach((e) => {
    e.classList.remove("focus");
  });

  $(e.target).addClass("focus");

  currentFocus = e.target;
  keyboard.setInput($(e.target).val());
});

const clearInput = () => {
  keyboard.setInput("");
}

function onChange(input) {
  currentFocus.value = input;
}

function onKeyPress(button) {
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}
