<script lang="ts">
  import type { DailySummaryData } from '#lib/dailies/dailies.remote.js';
  import { useFiles } from '@ampatspell/tiny/files';
  import { format } from './utils';

  let { daily }: { daily: DailySummaryData } = $props();

  let files = useFiles();

  let src = $derived.by(() => {
    let id = daily.file?.id;
    if (id) {
      return files.resolve({ id, variant: '2048x2048' });
    }
  });
</script>

{#if src}
  <img loading="lazy" draggable="false" alt={daily.caption ?? format(daily.date)} {src} />
{/if}

<style lang="scss">
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: var(--position);
  }
</style>
