<script lang="ts" module>
  export type CarouselOptions = {
    height: number | undefined;
  };
</script>

<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';

  let {
    gallery,
    selected,
    options,
    onSelect: _onSelect,
  }: {
    gallery: GalleryModel;
    selected: GalleryFileModel;
    options: CarouselOptions;
    onSelect: (file: GalleryFileModel) => void;
  } = $props();

  let height = $derived(options.height);
</script>

<div class="carousel" style:--height="{height}px">
  <div class="images"></div>
</div>

<style lang="scss">
  .carousel {
    position: relative;
    height: var(--height);
    > .images {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
