<script>
  import Guess from "./Guess.svelte";
  import Points from "./Points.svelte";
  import Alerts from "./Alerts.svelte";
  import Mode from "./Mode.svelte";
  import Elements from "./Elements.svelte";
  import Theme from "./Theme.svelte";
</script>

<main>
  <div class="container">
    <h1>guess the element</h1>
    <Alerts />
    <Mode />
    <Theme />
    <Points />
    <Guess />
    <Elements />
  </div>
</main>

<style lang="scss">
  main {
    margin: 50px;
  }

  h1 {
    margin: 25px 0;
    font-size: 40px;
  }
</style>
