<script lang="ts">
  import type { IndexPageSettingsModel } from '../settings.svelte';
  import { preloadImage } from '$dummy/lib/utils/image';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();

  let settings = $derived(runtime.page?.settingsAs<IndexPageSettingsModel>());
  let gallery = $derived(settings?.gallery);
  let image = $derived(gallery?.images[0].thumbnails['2048x2048'].url);

  let isLoaded = $state(false);
  $effect(() => {
    if (image) {
      preloadImage(image).then(() => (isLoaded = true));
    }
  });
</script>

<div class="index" class:is-loading={!isLoaded}>
  <div class="image">
    <div class="content" style:--url="url('{image}')"></div>
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  .index {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    > .image {
      position: fixed;
      --offset: -15px;
      top: var(--offset);
      left: var(--offset);
      right: var(--offset);
      bottom: var(--offset);
      z-index: -1;
      display: flex;
      background: #111;
      > .content {
        flex: 1;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: var(--url);
        transition: 0.5s ease-in-out opacity;
      }
    }
    &.is-loading {
      > .image {
        > .content {
          opacity: 0;
        }
      }
    }
  }
</style>
