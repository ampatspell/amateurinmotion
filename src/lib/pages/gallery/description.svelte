<script lang="ts">
  import type { Gallery, GalleryFile } from '$lib/directus/schema';

  let { gallery, selected }: { gallery: Gallery; selected: GalleryFile } = $props();
</script>

<div class="carousel">
  {gallery.title}
</div>

<style lang="scss">
  .carousel {
  }
</style>
