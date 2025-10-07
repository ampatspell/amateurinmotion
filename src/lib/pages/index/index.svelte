<script lang="ts">
    import { getDirectus } from '$lib/directus/directus';
  import { loadIndex, type IndexModel } from '$lib/models/index.svelte';
  import Background from './background.svelte';
  import Links from './links.svelte';

  let { index }: { index: IndexModel } = $props();

  $effect(() => {
    let run = async () => {
      let res = await loadIndex(getDirectus(fetch));
      console.log(res);
    };
    run();
  })
</script>

<div class="index">
  {#if index.background.url}
    <div class="background" style:--offset="{-index.background.inset}px">
      <Background url={index.background.url} />
    </div>
    <div class="links">
      <Links {index} />
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
    > .links {
      position: absolute;
      top: var(--header-height);
      left: var(--padding);
      bottom: 0;
      right: 0;
    }
  }
</style>
