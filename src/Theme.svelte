<script>
    const r = document.querySelector(':root');

    function changeTheme() {
        let color1 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
        r.style.setProperty('--color1', color1);

        let color2 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
        let end = false;

        while (!end) {
            if (color2 !== color1) {
                end = true;
            } else {
                color2 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
            }
        }

        r.style.setProperty('--color2', color2);
    }
</script>
<button on:click|preventDefault={changeTheme}>
    random theme
</button>

<style>
    button {
        margin-top: 10px;
    }
</style>