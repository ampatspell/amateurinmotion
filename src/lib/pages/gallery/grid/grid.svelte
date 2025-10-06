<script lang="ts" module>
  export const gridAlignments = ['center', 'bottom-left', 'bottom-center'] as const;
  export type GridAlignment = (typeof gridAlignments)[number];
  export const gridAlignmentLabels: { [key in GridAlignment]: string } = {
    center: 'Center',
    'bottom-left': 'Bottom left',
    'bottom-center': 'Bottom center',
  };

  export type GridOptions = {
    gap: number;
    alignment: GridAlignment;
    aspectRatio: number;
    thumbnail: string;
  };
</script>

<script lang="ts">
  import type { Gallery, GalleryFile } from '$lib/directus/schema';

  import Image from './image.svelte';

  let {
    gallery,
    options,
    onSelect: _onSelect,
  }: {
    gallery: Gallery;
    options: GridOptions;
    onSelect: (file: GalleryFile) => void;
  } = $props();

  let gap = $derived(options.gap);
  let gridWidth = $state<number>();

  let numberOfColumns = $derived.by(() => {
    if (gridWidth) {
      return Math.max(2, Math.floor(gridWidth / 200));
    }
  });

  let size = $derived.by(() => {
    if (gridWidth && numberOfColumns) {
      const w = gridWidth - gap * (numberOfColumns - 1);
      const size = w / numberOfColumns;
      const width = size;
      const height = width / options.aspectRatio;
      return {
        width,
        height,
      };
    }
  });

  let onSelect = (image: GalleryFile) => () => _onSelect(image);
  let images = $derived(gallery.images as GalleryFile[]);
</script>

{#if images.length > 0}
  <div class="grid" bind:clientWidth={gridWidth}>
    {#if size}
      <div class="images" style:--gap="{gap}px" style:--width="{size.width}px" style:--height="{size.height}px">
        {#each images as file (file)}
          <Image {file} {options} onClick={onSelect(file)} />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .images {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--gap);
    }
  }
</style>
