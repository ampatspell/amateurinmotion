<script lang="ts">
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { GalleryPageSettingsModel } from '../settings.svelte';
  import Gallery from './gallery.svelte';
  import Header from './header.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = $derived(page.settings as GalleryPageSettingsModel);
  let title = $derived(settings.title);
  let gallery = $derived(settings.gallery);
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
