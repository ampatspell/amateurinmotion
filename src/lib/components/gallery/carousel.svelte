<script lang="ts" module>
  export type CarouselOptions = {
    height: number | undefined;
  };
</script>

<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';
  import { untrack } from 'svelte';
  import Swiper from 'swiper';
  import { Keyboard } from 'swiper/modules';

  import 'swiper/css';

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
      let initialSlide = untrack(() => gallery.images.indexOf(selected));
      let swiper = new Swiper(element, {
        modules: [Keyboard],
        initialSlide,
        keyboard: {
          enabled: true,
        },
      });
      swiper.on('slideChangeTransitionEnd', () => {
        let index = swiper.realIndex;
        let image = gallery.imageByIndex(index);
        if (image && image !== selected) {
          onSelect(image);
        }
      });
      return () => swiper.destroy();
    }
  });

  let images = $derived(gallery.images);
</script>

<div class="carousel" style:--height="{height}px">
  <div class="swiper" bind:this={element}>
    <div class="swiper-wrapper">
      {#each images as image (image.identifier)}
        <div class="swiper-slide">
          <div class="image" style:--url="url({image.thumbnails.carousel})"></div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .carousel {
    position: relative;
    height: var(--height);
    > .swiper {
      height: 100%;
      > .swiper-wrapper {
        > .swiper-slide {
          display: flex;
          flex-direction: column;
          > .image {
            flex: 1;
            background-image: var(--url);
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
</style>
