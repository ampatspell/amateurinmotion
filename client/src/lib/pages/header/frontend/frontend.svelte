<script lang="ts">
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  let {}: { page: PageModel } = $props();
</script>

<div class="header">
  Header
</div>

<style lang="scss">
  .header {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
