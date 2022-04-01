<script>
    import { status } from './stores.js'
    let statusValue;

    status.subscribe((value) => {
        statusValue = value;
    });
</script>
<div class="alert">
    <span>{statusValue}</span>
</div>

<style lang="scss">
    .alert {
        margin-bottom: 10px;
        
        span {
            font-size: 20px;
        }
    }
</style>