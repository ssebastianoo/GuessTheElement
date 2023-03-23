<script>
    import { status } from "./store";
    let statusValue;

    status.subscribe((value) => {
        statusValue = value;
    });
</script>

<div class="alert">
    {#if statusValue.guessed}
        <span class="correct">{statusValue.message}</span>
    {:else}
        <span class="wrong">{statusValue.message}</span>
    {/if}
</div>

<style lang="scss">
    .alert {
        margin-bottom: 10px;

        span {
            font-size: 20px;
        }

        .correct {
            background-color: var(--correct);
        }

        .wrong {
            background-color: var(--wrong);
        }
    }
</style>
