<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';

  let { gallery, selected }: { gallery: GalleryModel; selected: GalleryFileModel } = $props();

  let title = $derived(gallery.title);

  let regex = /^[0-9]{3}--(.+)$/;
  let normalize = (input: string) => {
    const name = regex.exec(input)?.[1];
    return name ?? input;
  };
</script>

<div class="description">
  <div class="title">{title}</div>
  {#if selected}
    <div class="name">{normalize(selected.identifier)}</div>
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
