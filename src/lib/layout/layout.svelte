<script lang="ts">
  import type { Snippet } from 'svelte';
  import Header from './header.svelte';
  import { page } from '$app/state';
  import type { IndexModel } from '$lib/models/index.svelte';

  let { index, children }: { index: IndexModel; children: Snippet } = $props();
  let isIndex = $derived(page.url.pathname === '/');
  let colors = $derived(isIndex ? index.colors.index : index.colors.default);
</script>

<div class="layout" style:--background={colors.background} style:--color={colors.color}>
  <Header {index} />
  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .layout {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--background);
    color: var(--color);
    padding: var(--header-height) 0 0 0;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
