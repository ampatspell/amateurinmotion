<script lang="ts">
  import { IndexModel } from '$lib/models/index.svelte';
  import Index from '$lib/pages/index/index.svelte';

  let { data } = $props();

  let index = $derived(IndexModel.build(data.index));
</script>

<div class="page">
  <Index {index} />
</div>

<style lang="scss">
  .page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
</style>
