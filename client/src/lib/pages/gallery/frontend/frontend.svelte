<script lang="ts">
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import type { GalleryPageSettingsModel } from '../settings.svelte';
  import Gallery from './gallery.svelte';
  import Header from './header.svelte';

  let { runtime }: { runtime: PageRuntimeModel } = $props();
  let settings = $derived(runtime.page?.settingsAs<GalleryPageSettingsModel>());
  let title = $derived(settings?.title ?? '');
  let gallery = $derived(settings?.gallery);
</script>

<div class="hello">
  <Header {title} />
  {#if gallery}
    <Gallery {gallery} />
  {/if}
</div>

<style lang="scss">
  .hello {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
