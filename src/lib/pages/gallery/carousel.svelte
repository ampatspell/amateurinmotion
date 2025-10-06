<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';

  let {
    gallery,
    selected,
    onSelect: _onSelect,
  }: {
    gallery: GalleryModel;
    selected: GalleryFileModel;
    onSelect: (file: GalleryFileModel) => void;
  } = $props();
</script>

<div class="carousel">
  {gallery.title}
</div>

<style lang="scss">
  .carousel {
  }
</style>
