<script>
    import Guess from "./Guess.svelte";
    import Points from "./Points.svelte";
    import Alerts from "./Alerts.svelte";
    import Mode from "./Mode.svelte";
    import Elements from "./Elements.svelte";
    import Theme from "./Theme.svelte";

    import { onMount } from "svelte";

    onMount(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js", {
                    scope: "/",
                })
                .then((registration) => {
                    registration.update();
                });
        }
    });
</script>

<main>
    <!-- <SvelteSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        keywords="periodic table, element, elements, guess the element, guess the periodic table element, guess game, chemistry, game, web game, js game, javascript game"
        openGraph={{
            title: seo.title,
            description: seo.description,
            url: seo.url,
            images: [
                {
                    url: seo.logo.url,
                    width: seo.logo.width,
                    height: seo.logo.height,
                    alt: seo.logo.alt,
                },
            ],
        }}
        twitter={{
            site: "@ssebastianoo",
            title: seo.title,
            description: seo.description,
            image: seo.logo.url,
            imageAlt: seo.logo.alt,
        }}
    /> -->
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
