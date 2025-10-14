<script lang="ts">
  import './global.scss';
  import Layout from '$lib/layout/layout.svelte';
  import { IndexModel } from '$lib/models/index.svelte';
  import { dev } from '$app/environment';

  let { data, children } = $props();

  let index = $derived(IndexModel.build(data.index));
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  {#if !dev}
    <script
      defer
      src="https://umami.app.amateurinmotion.com/script.js"
      data-website-id="1250982d-012e-4a53-a851-e4ba7429cb7f"
    ></script>
  {/if}
</svelte:head>

<Layout {index}>
  {@render children?.()}
</Layout>
