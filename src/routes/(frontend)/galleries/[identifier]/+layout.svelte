<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Dark from '$d2/components/dark/dark.svelte';
  import Placeholder from '$d2/components/dark/placeholder.svelte';
  import LucideImages from '$d2/icons/lucide--images.svelte';
  import { subscribe } from '$d2/lib/base/model/subscriber.svelte';
  import type { FileNodeModel } from '$d2/lib/definition/file/node.svelte';
  import Gallery from '$lib/components/gallery.svelte';
  import type { LayoutData } from './$types';

  let { data }: { data: LayoutData } = $props();

  $effect(() => subscribe(data.gallery));

  let gallery = $derived(data.gallery.node);
  let selected = $derived(gallery?.details.imageByIdentifier(page.params.selected));
  let onSelect = (node: FileNodeModel) => {
    if (gallery) {
      goto(`/galleries/${gallery.identifier}/${node.identifier}`, { replaceState: true });
    }
  };
</script>

{#if gallery}
  <Gallery {gallery} {selected} {onSelect} />
{:else}
  <Dark>
    <Placeholder icon={LucideImages} label="Gallery not found" />
  </Dark>
{/if}
