<script lang="ts">
  import type { PageBaseModel } from '$dummy/lib/pages/page.svelte';

  let {
    pages,
  }: {
    pages: PageBaseModel[];
  } = $props();
</script>

<div class="links">
  {#each pages as page}
    <a href={page.url}>{page.name}</a>
  {/each}
</div>

<style lang="scss">
  .links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 16px;
    color: #fff;
    > a {
      text-decoration: none;
    }
  }
</style>
