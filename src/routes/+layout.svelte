<script lang="ts">
  import './global.scss';
  import Layout from '$lib/layout/layout.svelte';
  import { IndexModel } from '$lib/models/index.svelte';

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
</svelte:head>

<Layout {index}>
  {@render children?.()}
</Layout>
