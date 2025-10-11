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

  let position = $state<'prev' | 'next'>();
  let quiet = $state(false);
  let onkeydown = () => (quiet = true);
  let onmousemove = (e: MouseEvent) => {
    quiet = false;
    if (element) {
      const rect = element.getBoundingClientRect();
      let x = e.clientX;
      if (x > rect.width / 2) {
        position = 'next';
      } else {
        position = 'prev';
      }
    }
  };

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

  let onclick = () => {
    let image;
    if (position === 'next') {
      image = gallery.nextImage(selected);
    } else if (position === 'prev') {
      image = gallery.previousImage(selected);
    }
    quiet = true;
    if (image) {
      onSelect(image);
    }
  };

  let images = $derived(gallery.images);
</script>

<svelte:window {onkeydown} {onmousemove} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="carousel" class:quiet style:--height="{height}px">
  <div class={['swiper', `position-${position}`]} bind:this={element} {onclick}>
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
      cursor: grab;
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
      &.position-prev {
        cursor:
          url('/icons/lucide--chevron-left.svg') 13 16,
          auto;
      }
      &.position-next {
        cursor:
          url('/icons/lucide--chevron-right.svg') 20 16,
          auto;
      }
    }
    &.quiet {
      > .swiper {
        cursor: none;
      }
    }
  }
</style>
