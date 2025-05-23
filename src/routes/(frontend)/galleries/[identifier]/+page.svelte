<script lang="ts">
  import Dark from '$d2/components/dark/dark.svelte';
  import Placeholder from '$d2/components/dark/placeholder.svelte';
  import LucideImages from '$d2/icons/lucide--images.svelte';
  import { subscribe } from '$d2/lib/base/model/subscriber.svelte';
  import Gallery from '$lib/components/gallery.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  $effect(() => subscribe(data.gallery));

  let gallery = $derived(data.gallery.node);
</script>

{#if gallery}
  <Gallery {gallery} />
{:else}
  <Dark>
    <Placeholder icon={LucideImages} label="Gallery not found" />
  </Dark>
{/if}
