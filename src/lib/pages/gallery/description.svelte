<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';

  let { gallery, selected }: { gallery: GalleryModel; selected: GalleryFileModel } = $props();
</script>

<div class="carousel">
  {gallery.title}
</div>

<style lang="scss">
  .carousel {
  }
</style>
