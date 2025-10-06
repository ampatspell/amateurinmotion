<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Gallery } from '$lib/directus/schema';
  import type { IndexModel } from '$lib/models/index.svelte';

  let { index }: { index: IndexModel } = $props();
  let links = $derived(index.links);
</script>

<div class="links">
  {#each links.all as link (link.id)}
    {#if link.props}
      <a class="link" href={link.props.href}>{link.props.label}</a>
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
