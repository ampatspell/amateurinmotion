<script lang="ts">
  import type { Gallery, GalleryFile } from '$lib/directus/schema';
  import { innerHeight, innerWidth } from 'svelte/reactivity/window';
  import Carousel from './carousel.svelte';
  import Description from './description.svelte';
  import Grid, { type GridOptions } from './grid/grid.svelte';
  import { options } from '$lib/utils/options';
  import { aspectRatio } from '$lib/utils/aspect-ratio';

  let { gallery }: { gallery: Gallery } = $props();

  innerHeight;
  innerWidth;

  let gridOptions: GridOptions = options({
    gap: 15,
    thumbnail: '400x400',
    alignment: 'center',
    aspectRatio: aspectRatio('3x2'),
  });

  let selected = $derived.by(() => {
    let images = gallery.images;
    if (images) {
      let image = images[0];
      if (image) {
        return image as GalleryFile;
      }
    }
  });

  let onSelect = (file: GalleryFile) => {};
</script>

<div class="gallery">
  {#if selected}
    <div class="lightbox">
      <Carousel {gallery} {selected} {onSelect} />
    </div>
    <div class="details">
      <Description {gallery} {selected} />
      <Grid {gallery} {onSelect} options={gridOptions} />
    </div>
  {/if}
</div>

<style lang="scss">
  .gallery {
    flex: 1;
  }
</style>
