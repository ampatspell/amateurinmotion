<script lang="ts">
  import './theme.scss';
  import type { Snippet } from 'svelte';
  import { parsePath, type PathWithArgs } from '$dummy/lib/pages/path.svelte';
  import Path from '$dummy/components/frontend/path/path.svelte';

  let { children }: { children: Snippet; path?: PathWithArgs; } = $props();

  let header = parsePath('/header');
</script>

<div class="theme">
  <div class="header">
    <Path path={header} />
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .theme {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: var(--theme-font-family);
    font-size: var(--theme-font-size);
    font-weight: var(--theme-font-weight);
    cursor: default;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
