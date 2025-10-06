<script lang="ts">
  import type { Gallery, GalleryFile } from '$lib/directus/schema';

  let {
    gallery,
    selected,
    onSelect: _onSelect,
  }: {
    gallery: Gallery;
    selected: GalleryFile | undefined;
    onSelect: (file: GalleryFile) => void;
  } = $props();
</script>

<div class="carousel">
  {gallery.title}
</div>

<style lang="scss">
  .carousel {
  }
</style>
