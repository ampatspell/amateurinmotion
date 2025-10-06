<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';

  let { gallery, selected }: { gallery: GalleryModel; selected: GalleryFileModel } = $props();

  let title = $derived(gallery.title);
</script>

<div class="description">
  <div class="title">{title}</div>
  {#if selected}
    <div class="name">{selected.identifier}</div>
  {/if}
</div>

<style lang="scss">
  .description {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 20px;
    > .title {
      font-weight: 600;
    }
    > .name {
      font-size: 11px;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 5px;
    }
  }
</style>
