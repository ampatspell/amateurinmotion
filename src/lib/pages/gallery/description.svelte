<script lang="ts">
  import type { GalleryFileModel, GalleryModel } from '$lib/models/galleries.svelte';
  import Like from './like.svelte';

  let { gallery, selected }: { gallery: GalleryModel; selected: GalleryFileModel } = $props();

  let title = $derived(gallery.title);

  let regex = /^[0-9]{3}--(.+)$/;
  let normalize = (input: string) => {
    const name = regex.exec(input)?.[1];
    return name ?? input;
  };
</script>

<div class="description">
  <div class="main">
    <div class="title">{title}</div>
    {#if selected}
      <div class="name">{normalize(selected.identifier)}</div>
    {/if}
  </div>
  <div class="like">
    <Like file={selected} />
  </div>
</div>

<style lang="scss">
  .description {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(var(--padding) / 2);
    > .main {
      display: flex;
      flex-direction: row;
      gap: calc(var(--padding) / 2);
      align-items: baseline;
      > .title {
        font-weight: 600;
      }
      > .name {
        font-size: 11px;
      }
    }
    > .like {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
</style>
