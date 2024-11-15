<script lang="ts">
  import Grid, { type GridOptions } from '$dummy/components/frontend/blocks/galleries/grid/grid.svelte';
  import Lightbox, { type LightboxOptions } from '$dummy/components/frontend/blocks/galleries/lightbox/lightbox.svelte';
  import { GalleryImageModel } from '$dummy/lib/galleries/image.svelte';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import { aspectRatioValues } from '$dummy/lib/utils/aspect-ratio';
  import { getter, options } from '$dummy/lib/utils/options';
  import type { GalleryPageSettingsModel } from '../settings.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();
  let settings = $derived(runtime.page?.settingsAs<GalleryPageSettingsModel>());
  let title = $derived(settings?.title ?? '');
  let gallery = $derived(settings?.gallery);

  let selected = $state<GalleryImageModel>();
  $effect(() => {
    selected = gallery?.images[0];
  });

  let onSelect = (image: GalleryImageModel) => {
    selected = image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let innerHeight = $state<number>();

  let lightbox: LightboxOptions = options({
    height: getter(() => {
      if (innerHeight) {
        return innerHeight - 215;
      }
    }),
    captions: false,
    horizontalPadding: 30,
    thumbnail: '2048x2048',
  });

  let grid: GridOptions = options({
    alignment: 'center',
    aspectRatio: aspectRatioValues['3x2'],
    captions: false,
    gap: 30,
    thumbnail: '2048x2048',
  });
</script>

<svelte:window bind:innerHeight />

{#if gallery}
  <div class="gallery">
    <div class="lightbox">
      <Lightbox {gallery} {selected} options={lightbox} {onSelect} />
    </div>
    <div class="description">
      <div class="title">{title}</div>
      {#if selected?.name}
        <div class="delimiter">/</div>
        <div class="name">{selected?.name}</div>
      {/if}
    </div>
    <div class="grid">
      <Grid {gallery} options={grid} {onSelect} />
    </div>
  </div>
{/if}

<style lang="scss">
  .gallery {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 30px;
    > .lightbox {
      padding: 30px 0;
    }
    > .description {
      padding: 0 30px;
      display: flex;
      flex-direction: row;
      gap: 5px;
      > .title {
        font-weight: 500;
      }
      > .delimiter {
        font-weight: 200;
      }
    }
    > .grid {
      padding: 0 30px;
    }
  }
</style>
