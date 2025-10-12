<script lang="ts">
  import { images } from '@ampatspell/directus-common/utils/images';
  import { fade, type FadeParams } from 'svelte/transition';

  let { url }: { url: string } = $props();

  let isLoaded = $derived(images.has(url));
  let params = $state<FadeParams>();

  $effect(() => {
    images.preload(url);
  });

  $effect(() => {
    if (!isLoaded) {
      params = { duration: 300 };
    }
  });
</script>

{#if isLoaded}
  <div class="background" style:--url="url({url})" transition:fade={params}></div>
{/if}

<style lang="scss">
  .background {
    flex: 1;
    display: flex;
    background-image: var(--url);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
