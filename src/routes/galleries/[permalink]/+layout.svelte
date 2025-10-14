<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import Seo from '$lib/components/seo.svelte';
  import { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte.js';
  import Gallery from '$lib/pages/gallery/gallery.svelte';

  let { data, children } = $props();

  let gallery = $derived(GalleryModel.build(data.gallery));
  let permalink = $derived(gallery.permalink);

  let identifier = $derived(page.params.identifier);

  let selected = $derived.by<GalleryFileModel | undefined>(() => {
    return gallery.imageByIdentifier(identifier) ?? gallery.images[0];
  });

  let onSelect = async (file: GalleryFileModel) => {
    const identifier = file.identifier;
    await goto(resolve('/galleries/[permalink]/[identifier]', { permalink, identifier }), {
      replaceState: true,
      noScroll: true,
    });
  };
</script>

{#if selected}
  <Seo seo={gallery.seoFor(selected)} />
{/if}

<Gallery {gallery} {selected} {onSelect} />

{@render children()}
