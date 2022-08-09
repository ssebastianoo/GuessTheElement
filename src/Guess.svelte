<script>
    import {
        elements,
        correctPoints,
        totalPoints,
        status,
        mode,
        guessedElements,
        reset,
    } from "./stores.js";
    import { onMount } from "svelte";
    let elementsValue, originalElements, element, input, inputEl, modeValue;
    let alreadyChosen = Array(0);

    elements.subscribe((value) => {
        elementsValue = value;
        if (!originalElements) originalElements = value;
    });

    mode.subscribe((value) => {
        modeValue = value;
        newElement();
    });

    reset.subscribe(() => {
        elementsValue = [...originalElements];
        alreadyChosen = Array(0);
    });

    function newElement() {
        input = "";
        if (elementsValue.length === 0) {
            elementsValue = alreadyChosen;
            alreadyChosen = Array(0);
        }

        let elementNumber = Math.floor(Math.random() * elementsValue.length);
        element = elementsValue[elementNumber];
        elementsValue.splice(elementNumber, 1);
        alreadyChosen.push(element);
        if (inputEl) inputEl.focus();
    }

    onMount(newElement);

    function checkAnswer() {
        totalPoints.update((n) => n + 1);

        let guessed = false;
        let correctAnswer;
        if (modeValue === "guessSymbol") {
            if (
                element.names.includes(input.toLowerCase().replace(/\s/g, ""))
            ) {
                guessed = true;
            } else {
                guessed = false;
                correctAnswer = element.name.toLowerCase();
            }
        } else {
            if (
                element.symbol.toLowerCase() ===
                input.toLowerCase().replace(/\s/g, "")
            ) {
                guessed = true;
            } else {
                guessed = false;
                correctAnswer = element.symbol.toLowerCase();
            }
        }

        if (guessed) {
            status.set({ guessed: true, message: "correct" });
            correctPoints.update((n) => n + 1);
            guessedElements.update((n) => [element, ...n]);
            newElement();
        } else {
            status.set({
                guessed: false,
                message: `nope, it was ${correctAnswer}`,
            });
            newElement();
        }
    }
</script>

{#if element}
    {#if modeValue === "guessSymbol"}
        <p class="hint">{element.symbol}</p>
    {:else}
        <p class="hint">{element.name}</p>
    {/if}
    <form on:submit|preventDefault={checkAnswer}>
        <input
            placeholder="type your guess"
            type="text"
            bind:value={input}
            bind:this={inputEl}
        />
    </form>
{/if}

<style lang="scss">
    .hint {
        font-size: 50px;
        margin: 15px 0;
    }

    input {
        margin-top: 0;
        margin-bottom: 20px;
        background: none;
        border: none;
        outline: none;
        color: unset;
        font-family: unset;
        width: 100%;
        font-size: 30px;
    }
</style>
