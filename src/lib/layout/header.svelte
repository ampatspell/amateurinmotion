<script lang="ts">
  import type { Index } from '$lib/directus/schema';
  import { resolve } from '$app/paths';
  import { scrollY } from 'svelte/reactivity/window';

  let { index }: { index: Index } = $props();

  let opacity = $derived.by(() => {
    let max = 300;
    let y = Math.min(scrollY.current ?? 0, max);
    return 1 - y / max;
  });
</script>

<div class="header" style:--opacity={opacity}>
  <a class="title" href={resolve('/')}>{index.title}</a>
</div>

<style lang="scss">
  .header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 var(--padding);
    opacity: var(--opacity);
    > .title {
      font-size: 21px;
      font-weight: 500;
      text-decoration: none;
      color: var(--color);
      transition: 0.3s ease-in-out color;
    }
  }
</style>
