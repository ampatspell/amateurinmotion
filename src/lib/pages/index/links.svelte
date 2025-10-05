<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Gallery, Index, IndexLink } from '$lib/directus/schema';

  let { index }: { index: Index } = $props();
  let links = $derived(index.links as IndexLink[]);
</script>

<div class="links">
  {#each links as link (link.id)}
    {#if link.collection === 'gallery'}
      <a class="link" href={resolve('/')}>{(link.item as Gallery).title}</a>
    {/if}
  {/each}
</div>

<style lang="scss">
  .links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > .link {
      font-size: 16px;
      text-decoration: none;
    }
  }
</style>
