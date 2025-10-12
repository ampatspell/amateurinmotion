<script lang="ts">
  import Description from './description.svelte';
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';
  import { onMount } from 'svelte';
  import type { GridOptions } from '$lib/components/gallery/grid/grid.svelte';
  import Grid from '$lib/components/gallery/grid/grid.svelte';
  import Download from './download.svelte';
  import { createInnerHeight, createInnerWith } from '@ampatspell/directus-common/utils/reactivity';
  import { getter, options } from '@ampatspell/directus-common/utils/options';
  import { aspectRatio } from '@ampatspell/directus-common/utils/aspect-ratio';
  import Carousel, { type CarouselOptions } from '@ampatspell/directus-common/components/gallery/carousel';

  let {
    gallery,
    selected: _selected,
    onSelect: _onSelect,
  }: {
    gallery: GalleryModel;
    selected: GalleryFileModel;
    onSelect: (file: GalleryFileModel) => Promise<void>;
  } = $props();

  let innerWidth = createInnerWith(Infinity);
  let innerHeight = createInnerHeight(0);

  let isMobile = $derived(innerWidth.current <= 768);

  let height = $derived.by(() => {
    if (innerHeight) {
      let base = innerHeight.current - 180;
      if (isMobile) {
        return base + 110;
      }
      return base;
    }
  });

  let lightboxOptions: CarouselOptions = options({
    height: getter(() => height),
    thumbnail: '2048x2048',
  });

  let gridOptions: GridOptions = options({
    gap: 15,
    thumbnail: '400x400',
    alignment: 'center',
    aspectRatio: aspectRatio('3x2'),
  });

  let selected = $derived(_selected ?? gallery.images[0]!);

  let onSelect = async (node: GalleryFileModel) => {
    await _onSelect(node);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  let isLoaded = $state(false);

  onMount(() => {
    isLoaded = true;
  });
</script>

<div class="gallery" class:loaded={isLoaded}>
  {#if gallery.download}
    <div class="download">
      <Download {gallery} />
    </div>
  {/if}
  {#if selected}
    <div class="lightbox">
      <Carousel
        images={gallery.carousel}
        selected={selected.carousel}
        onSelect={(image) => onSelect(image.file)}
        options={lightboxOptions}
      />
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
    display: flex;
    flex-direction: column;
    gap: var(--padding);
    opacity: 0;
    &.loaded {
      opacity: 1;
    }
    > .lightbox {
      display: flex;
      flex-direction: column;
    }
    > .details {
      display: flex;
      flex-direction: column;
      gap: var(--padding);
      border-top: 1px solid #eee;
      padding: var(--padding);
      @media (max-width: 768px) {
        padding: 15px;
      }
    }
    > .download {
      position: fixed;
      top: 15px;
      right: var(--padding);
      z-index: 2;
    }
  }
</style>
