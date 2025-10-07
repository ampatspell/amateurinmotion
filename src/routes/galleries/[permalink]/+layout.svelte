<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte.js';
  import Gallery from '$lib/pages/gallery/gallery.svelte';

  let { children } = $props();

  let gallery = $derived(await GalleryModel.load(page.params.permalink!));
  let permalink = $derived(gallery.permalink);

  let identifier = $derived(page.params.identifier);

  let selected = $derived.by(() => {
    return gallery.imageByIdentifier(identifier) ?? gallery.images[0]!;
  });

  let onSelect = async (file: GalleryFileModel) => {
    const identifier = file.identifier;
    await goto(resolve('/galleries/[permalink]/[identifier]', { permalink, identifier }), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

<Gallery {gallery} {selected} {onSelect} />

{@render children()}
