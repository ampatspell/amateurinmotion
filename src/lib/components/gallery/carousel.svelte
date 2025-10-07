<script lang="ts" module>
  export type CarouselOptions = {
    height: number | undefined;
  };
</script>

<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';
  import { untrack } from 'svelte';
  import Swiper from 'swiper';
  import { Keyboard, Mousewheel } from 'swiper/modules';
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

  let quiet = $state(false);
  let onkeydown = () => (quiet = true);
  let onmousemove = () => (quiet = false);

  let swiper: Swiper | undefined;

  $effect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selected;
    untrack(() => {
      if (swiper) {
        let idx = gallery.images.indexOf(selected);
        if (idx !== swiper.realIndex) {
          swiper.slideTo(idx, 0);
        }
      }
    });
  });

  $effect(() => {
    if (element) {
      let initialSlide = untrack(() => gallery.images.indexOf(selected));
      let instance = new Swiper(element, {
        modules: [Keyboard, Mousewheel],
        initialSlide,
        mousewheel: {
          forceToAxis: true,
        },
        keyboard: {
          enabled: true,
        },
      });
      instance.on('slideChangeTransitionStart', () => {
        quiet = true;
      });
      instance.on('slideChangeTransitionEnd', () => {
        let index = instance.realIndex;
        let image = gallery.imageByIndex(index);
        if (image && image !== selected) {
          onSelect(image);
        }
      });
      swiper = instance;
      return () => {
        instance.destroy();
        swiper = undefined;
      };
    }
  });

  let images = $derived(gallery.images);
</script>

<svelte:window {onkeydown} {onmousemove} />

<div class="carousel" class:quiet style:--height="{height}px">
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
    cursor: grab;
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
    &.quiet {
      cursor: none;
    }
  }
</style>
