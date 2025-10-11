<script lang="ts">
  import type { SeoModel } from '$lib/models/seo.svelte';

  let { seo }: { seo: SeoModel } = $props();
</script>

<svelte:head>
  {#if seo.title}
    <meta content={seo.title} property="og:title" />
  {/if}
  {#if seo.metaDescription}
    <meta content={seo.metaDescription} property="og:description" />
  {/if}
  {#if seo.image}
    <meta content={seo.image} property="og:image" />
  {/if}
</svelte:head>
