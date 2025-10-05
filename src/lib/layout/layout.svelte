<script lang="ts">
  import type { Index } from '$lib/directus/schema';
  import type { Snippet } from 'svelte';
  import Header from './header.svelte';
  import { page } from '$app/state';

  let { index, children }: { index: Index; children: Snippet } = $props();
  let isIndex = $derived(page.url.pathname === '/');

  let colors = $derived.by(() => {
    let background;
    let color;
    if (isIndex) {
      background = index.indexBackgroundColor;
      color = index.indexTitleColor;
    } else {
      background = index.defaultBackgroundColor;
      color = index.defaultTitleColor;
    }
    return {
      background,
      color,
    };
  });
</script>

<div class="layout" style:--background={colors.background} style:--color={colors.color}>
  <Header {index} {isIndex} />
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
