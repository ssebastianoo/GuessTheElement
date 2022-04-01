<script>
  import { guessedElements } from "./stores.js";

  let guessedElementsValue;

  guessedElements.subscribe((value) => {
    guessedElementsValue = value;
  });
</script>

<div class="elements">
  {#each guessedElementsValue as element}
    <div class="element">
      <h2>{element.name}</h2>
      <div class="attributes">
        <div class="attribute">
          <span class="name">symbol</span>
          <span class="value">{element.symbol}</span>
        </div>
        <div class="attribute">
          <span class="name">number</span>
          <span class="value">{element.number}</span>
        </div>
        <div class="attribute">
          <span class="name">mass</span>
          <span class="value">{element.atomic_mass}</span>
        </div>
        <div class="attribute">
          <span class="name">category</span>
          <span class="value">{element.category}</span>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
    .elements {
        margin: 0;
    }

  .element {
    display: inline-block;
    background-color: RGBA(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;

    h2 {
      margin: 0;
    }

    .attributes {
      display: grid;
      grid-template-columns: repeat(2, 100px);

      .attribute {
        margin-top: 10px;
        display: inline-flex;
        flex-direction: column;

        .value {
          font-size: 20px;
        }
      }
    }
  }
</style>
