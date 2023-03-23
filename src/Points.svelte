<script>
    import { correctPoints, totalPoints } from "./store";
    let correctPointsValue, totalPointsValue;

    correctPoints.subscribe((value) => {
        correctPointsValue = value;
    });

    totalPoints.subscribe((value) => {
        totalPointsValue = value;
    });
</script>

<div class="points">
    <span>{correctPointsValue}/{totalPointsValue}</span>
</div>

<style lang="scss">
    .points {
        margin-top: 25px;

        span {
            font-size: 20px;
        }
    }
</style>
