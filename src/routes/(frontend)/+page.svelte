<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
  import Background from '$lib/components/background.svelte';

  let { data }: { data: PageData } = $props();

  let index = $derived(data.index.node);
  let background = $derived(index?.details.background?.thumbnails['2048x2048'].url);
  let offset = $derived(index?.details.offset ?? 0);
</script>

<div class="page" transition:fade={{ duration: 200 }}>
  {#if background}
    <div class="background" style:--offset="{-offset}px">
      <Background url={background} />
    </div>
  {/if}
  <div class="links">
    <a href="/galleries/random">Random</a>
  </div>
</div>

<style lang="scss">
  .page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #222;
    > .background {
      position: absolute;
      top: var(--offset);
      left: var(--offset);
      bottom: var(--offset);
      right: var(--offset);
      display: flex;
      flex-direction: column;
    }
    > .links {
      position: fixed;
      top: var(--header-height);
      left: var(--padding);
      display: flex;
      flex-direction: column;
      gap: 10px;
      > a {
        font-size: 16px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
</style>
