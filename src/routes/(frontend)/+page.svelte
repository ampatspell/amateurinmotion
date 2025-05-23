<script lang="ts">
  import { subscribe } from '$d2/lib/base/model/subscriber.svelte';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
  import { getter } from '$d2/lib/base/utils/options';
  import { Preload } from '$lib/utils/preload.svelte';

  let { data }: { data: PageData } = $props();

  let index = $derived(data.index.node);

  let background = new Preload({ url: getter(() => index?.details.background?.thumbnails['2048x2048'].url) });
  $effect(() => subscribe(background));
</script>

<div class="page" transition:fade={{ duration: 200 }}>
  {#if background.isLoaded}
    <div class="background" style:--background="url({background.url})" transition:fade={{ duration: 200 }}></div>
  {/if}
  <div class="links">
    <a href="/foo">foo</a>
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
      --offset: -15px;
      position: absolute;
      top: var(--offset);
      left: var(--offset);
      bottom: var(--offset);
      right: var(--offset);
      background-image: var(--background);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
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
