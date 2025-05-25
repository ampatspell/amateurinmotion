<script lang="ts">
  import { page } from '$app/state';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let gallery = $derived(data.gallery.node);
  let selected = $derived(gallery?.details.imageByIdentifier(page.params.selected));
  let image = $derived(selected?.asImage?.properties.thumbnails['2048x2048'].url);
</script>

<svelte:head>
  <title>{gallery?.title}</title>
  <meta content="amateurinmotion.com" property="og:title" />
  <meta content={gallery?.title} property="og:description" />
  <meta content={image} property="og:image" />
</svelte:head>
