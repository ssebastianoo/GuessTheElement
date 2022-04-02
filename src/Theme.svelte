<script>
    import * as themesRaw from "./themes.json";
    const themes = themesRaw.themes;

    let showMenu = false;
    const r = document.querySelector(":root");

    function showThemeSelection() {
        showMenu == true ? (showMenu = false) : (showMenu = true);
        /* let color1 = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');;
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

        r.style.setProperty('--color2', color2); */
    }

    function changeTheme(e) {
        console.log(e.target.style.color);
        r.style.setProperty('--color1', e.target.style.color);
        r.style.setProperty('--color2', e.target.style.backgroundColor);
    }
</script>

{#if showMenu}
    <div class="theme-selection">
        <div class="title">
            <i class="fas fa-times close-icon" on:click|preventDefault={showThemeSelection}/>
            <h1>select a theme</h1>
        </div>
        <div class="themes">
            {#each themes as theme}
                <div class="theme" on:click|preventDefault={changeTheme}>
                    <p
                        style="color: {theme['color1']};background-color:{theme[
                            'color2'
                        ]}"
                    >
                        {theme.name}
                    </p>
                </div>
            {/each}
        </div>
    </div>
{/if}

<button class="change-theme" on:click|preventDefault={showThemeSelection}>
    change theme
</button>

<style lang="scss">
    .change-theme {
        margin-top: 10px;
    }

    .theme-selection {
        position: fixed;
        margin: 0;
        top: 0;
        left: 0;
        background-color: RGBA(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;

        .title {
            background-color: var(--color2);
            display: flex;
            align-items: center;
            padding: 20px;

            .close-icon {
                font-size: 30px;

                &:hover {
                    cursor: pointer;
                }
            }

            h1 {
                margin: 0 0 0 13px;
            }
        }

        .themes {
            .theme {
                width: 100vw;

                p {
                    font-size: 30px;
                    margin: 0;
                    padding: 20px;
                    transition: padding 0.4s;
                }

                &:hover {
                    cursor: pointer;

                    p {
                        padding-left: 40px;
                    }
                }
            }
        }
    }
</style>
