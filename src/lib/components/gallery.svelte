<script lang="ts">
  import type { GridOptions } from '$d2/components/frontend/galleries/grid/grid.svelte';
  import Grid from '$d2/components/frontend/galleries/grid/grid.svelte';
  import type { LightboxOptions } from '$d2/components/frontend/galleries/lightbox/lightbox.svelte';
  import Lightbox from '$d2/components/frontend/galleries/lightbox/lightbox.svelte';
  import { aspectRatio } from '$d2/lib/base/utils/aspect-ratio';
  import { getter, options } from '$d2/lib/base/utils/options';
  import type { FileNodeModel } from '$d2/lib/definition/file/node.svelte';
  import type { GalleryNodeModel } from '$lib/definition/gallery/node.svelte';

  let {
    gallery,
    selected: _selected,
    onSelect: _onSelect,
  }: {
    gallery: GalleryNodeModel;
    selected: FileNodeModel | undefined;
    onSelect: (node: FileNodeModel) => void;
  } = $props();

  let title = $derived(gallery.title);
  let introduction = $derived(gallery.introduction);
  let files = $derived(gallery.details.images);

  let selected = $derived(_selected ?? gallery.details.images[0]);
  let onSelect = async (node: FileNodeModel) => {
    _onSelect(node);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  let innerHeight = $state<number>();
  let innerWidth = $state<number>(Infinity);
  let isMobile = $derived(innerWidth <= 768);

  let height = $derived.by(() => {
    if (innerHeight) {
      let base = innerHeight - 180;
      if (isMobile) {
        return base + 110;
      }
      return base;
    }
  });

  let horizontalPadding = $derived(isMobile ? 15 : 30);

  let lightboxOptions: LightboxOptions = options({
    horizontalPadding: getter(() => horizontalPadding),
    height: getter(() => height),
    thumbnail: '2048x2048',
  });

  let gridOptions: GridOptions = options({
    gap: 15,
    thumbnail: '400x400',
    alignment: 'center',
    aspectRatio: aspectRatio('3x2'),
  });

  let ogImage = $derived(files?.[0]?.asImage?.thumbnails['2048x2048'].url);

  let isLoaded = $derived(false);
  $effect(() => {
    isLoaded = true;
  });
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<svelte:head>
  <meta content={title} property="og:title" />
  <meta content={introduction} property="og:description" />
  <meta content={ogImage} property="og:image" />
</svelte:head>

<div class="page" class:loaded={isLoaded}>
  {#if files}
    <div class="lightbox">
      <Lightbox {files} {selected} {onSelect} options={lightboxOptions} />
    </div>
    <div class="details">
      <div class="caption">
        <div class="title">{title}</div>
        {#if introduction}
          <div class="introduction">{introduction}</div>
        {/if}
        {#if selected}
          <div class="name">{selected.identifier}</div>
        {/if}
      </div>
      <Grid {files} {onSelect} options={gridOptions} />
    </div>
  {/if}
</div>

<style lang="scss">
  .page {
    visibility: hidden;
    &.loaded {
      visibility: visible;
    }
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    > .lightbox {
      display: flex;
      flex-direction: column;
    }
    > .details {
      display: flex;
      flex-direction: column;
      gap: 30px;
      border-top: 1px solid #eee;
      padding: 30px;
      @media (max-width: 768px) {
        padding: 15px;
      }
      > .caption {
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
    }
  }
</style>
