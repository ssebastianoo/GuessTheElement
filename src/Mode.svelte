<script>
  import {
    mode,
    correctPoints,
    totalPoints,
    status,
    guessedElements,
    reset,
  } from "./stores.js";
  let modeValue;

  mode.subscribe((value) => {
    modeValue = value;
  });

  function changeMode() {
    correctPoints.update((n) => 0);
    totalPoints.update((n) => 0);
    status.set({guessed: null, message: ''});
    guessedElements.update((n) => []);
    reset.update((n) => Date.now());

    if (modeValue === "guessSymbol") {
      mode.update((n) => "guessName");
    } else {
      mode.update((n) => "guessSymbol");
    }
  }
</script>

<button on:click|preventDefault={changeMode}>change mode</button>
