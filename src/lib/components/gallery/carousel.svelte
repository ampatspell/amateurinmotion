<script lang="ts" module>
  export type CarouselOptions = {
    height: number | undefined;
  };
</script>

<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';
  import Glide from '@glidejs/glide';
  import { untrack } from 'svelte';

  let {
    gallery,
    selected,
    options,
    onSelect,
  }: {
    gallery: GalleryModel;
    selected: GalleryFileModel;
    options: CarouselOptions;
    onSelect: (file: GalleryFileModel) => void;
  } = $props();

  let height = $derived(options.height);

  let element = $state<HTMLElement>();

  $effect(() => {
    if (element) {
      let startAt = untrack(() => gallery.images.indexOf(selected));
      let glide = new Glide(element, {
        type: 'carousel',
        startAt,
        gap: 0,
        animationDuration: 500,
      });
      glide.on('move.after', () => {
        let image = gallery.imageByIndex(glide.index);
        if (image && image !== selected) {
          onSelect(image);
        }
      });
      glide.mount();
      return () => {
        glide.destroy();
      };
    }
  });

  let images = $derived(gallery.images);
</script>

<div class="carousel" style:--height="{height}px">
  <div class="glide" bind:this={element}>
    <div class="glide__track" data-glide-el="track">
      <div class="glide__slides">
        {#each images as image (image.identifier)}
          <div class="glide__slide">
            <div class="image" style:--url="url({image.thumbnails.carousel})"></div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .carousel {
    position: relative;
    height: var(--height);
    > .glide {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      > .glide__track {
        height: 100%;
        overflow: hidden;
        cursor: grab;
        > .glide__slides {
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: row;
          touch-action: pan-y;
          white-space: nowrap;
          flex-wrap: nowrap;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          > .glide__slide {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 var(--padding);
            > .image {
              flex: 1;
              width: 100%;
              background-image: var(--url);
              background-position: center center;
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
  }
</style>
