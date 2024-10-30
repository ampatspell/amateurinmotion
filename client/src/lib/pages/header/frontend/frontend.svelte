<script lang="ts">
  import { getPathContext } from '$dummy/components/frontend/path/context.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { HeaderPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = $derived(page.settings as HeaderPageSettingsModel);

  let context = getPathContext();

  let url = context.urlFor('/zins-2');
</script>

<div class="header">
  <a class="title" href="/">{settings.title}</a>
  <div class="links">
    <a href={url}>Zīns #2</a>
  </div>
</div>

<style lang="scss">
  .header {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 10px;
    > .title {
      text-decoration: none;
      flex: 1;
    }
    > .links {
      display: flex;
      flex-direction: row;
      gap: 10px;
      > a {
        text-decoration: none;
      }
    }
  }
</style>
