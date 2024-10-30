<script lang="ts">
  import { getPathContext } from '$dummy/components/frontend/path/context.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import { isTruthy } from '$dummy/lib/utils/array';
  import type { HeaderPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = $derived(page.settings as HeaderPageSettingsModel);

  let context = getPathContext();
  let isIndex = $derived(context.args?.[0] === 'index');

  let links = $derived.by(() => {
    let paths = settings.links
      .split(',')
      .map((item) => item.trim())
      .filter(isTruthy);
    return paths.map((path) => {
      return {
        name: path,
        url: context.urlFor(path),
      };
    });
  });
</script>

<div class="header" class:is-index={isIndex}>
  <a class="title" href="/">{settings.title}</a>
  <div class="links">
    {#each links as link}
      <a href={link.url}>{link.name}</a>
    {/each}
  </div>
</div>

<style lang="scss">
  .header {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 10px;
    transition: 0.15s ease-in-out color;
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
    &.is-index {
      color: #fff;
    }
  }
</style>
