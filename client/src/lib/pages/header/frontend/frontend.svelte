<script lang="ts">
    import { getPathContext } from '$dummy/components/frontend/path/context.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { HeaderPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = $derived(page.settings as HeaderPageSettingsModel);

  let context = getPathContext();
  $inspect(context.args);
</script>

<div class="header">
  <a class="title" href="/">{settings.title}</a>
</div>

<style lang="scss">
  .header {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 10px;
    > .title {
      text-decoration: none;
    }
  }
</style>
