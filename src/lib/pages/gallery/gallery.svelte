<script lang="ts">
  import { innerHeight, innerWidth } from 'svelte/reactivity/window';
  import Carousel from './carousel.svelte';
  import Description from './description.svelte';
  import Grid, { type GridOptions } from './grid/grid.svelte';
  import { options } from '$lib/utils/options';
  import { aspectRatio } from '$lib/utils/aspect-ratio';
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();

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
        return image as GalleryFileModel;
      }
    }
  });

  let onSelect = (file: GalleryFileModel) => {};
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
