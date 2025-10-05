<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="error">
  {page.error?.message}
</div>

<style lang="scss">
  .error {
    display: flex;
    font-size: 14px;
    background: #fff;
    color: #000;
    padding: var(--padding);
  }
</style>
