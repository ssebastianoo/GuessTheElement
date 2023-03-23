<script lang="ts">
    import { onMount } from "svelte";
    import * as themesRaw from "./themes.json";
    const themes = themesRaw.themes;

    let showMenu = false;
    const r = document.querySelector(":root") as HTMLElement;

    onMount(() => {
        if (localStorage.getItem("color1") && localStorage.getItem("color2")) {
            r.style.setProperty("--color1", localStorage.getItem("color1"));
            r.style.setProperty("--color2", localStorage.getItem("color2"));
        }
    });

    function showThemeSelection() {
        showMenu == true ? (showMenu = false) : (showMenu = true);
    }

    function changeTheme(e) {
        localStorage.setItem("color1", e.target.style.color);
        localStorage.setItem("color2", e.target.style.backgroundColor);
        r.style.setProperty("--color1", e.target.style.color);
        r.style.setProperty("--color2", e.target.style.backgroundColor);
    }
</script>

{#if showMenu}
    <div class="theme-selection">
        <div class="title">
            <!-- <i
                class="fas fa-times close-icon"
                on:click|preventDefault={showThemeSelection}
                on:keypress|preventDefault
            /> -->
            <svg
                on:click|preventDefault={showThemeSelection}
                on:keypress|preventDefault
                class="close-icon"
                fill="var(--color1)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                height="30px"
                ><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                /></svg
            >
            <h1>select a theme</h1>
        </div>
        <div class="themes">
            {#each themes as theme}
                <div
                    class="theme"
                    on:click|preventDefault={changeTheme}
                    on:keypress|preventDefault
                >
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
        overflow-y: auto;
        overflow-x: hidden;
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
                transform: translateY(2.5px);

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
