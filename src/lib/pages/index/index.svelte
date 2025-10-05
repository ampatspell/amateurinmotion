<script lang="ts">
  import type { Index } from '$lib/directus/schema';
  import { resolveImageThumbnailURL } from '$lib/utils/api.svelte';
  import Background from './background.svelte';

  let { index }: { index: Index } = $props();

  let background = $derived.by(() => {
    const id = index.backgroundImage;
    if (typeof id === 'string') {
      return resolveImageThumbnailURL(id, '1280x1280');
    }
  });

  let offset = $derived(index.backgroundInset ?? 0);
</script>

<div class="index">
  {#if background}
    <div class="background" style:--offset="{-offset}px">
      <Background url={background} />
    </div>
  {/if}
</div>

<style lang="scss">
  .index {
    flex: 1;
    display: flex;
    flex-direction: column;
    > .background {
      position: absolute;
      top: var(--offset);
      left: var(--offset);
      bottom: var(--offset);
      right: var(--offset);
      display: flex;
      flex-direction: column;
    }
  }
</style>
