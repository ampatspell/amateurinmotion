<script lang="ts">
  import Tiny from '@ampatspell/tiny/tiny';

  let { children } = $props();
</script>

<Tiny>
  {@render children()}
</Tiny>
