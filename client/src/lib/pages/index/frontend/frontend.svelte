<script lang="ts">
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  let {}: { page: PageModel } = $props();
</script>

<div class="index">
</div>

<style lang="scss">
  .index {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255,0,0,0.1);
  }
</style>
