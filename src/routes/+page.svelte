<script lang="ts">
  let { data } = $props();
  let index = $derived(data.index);
</script>

<div class="hello">{index.title}</div>

<style lang="scss">
  .hello {
    padding: 50px;
    font-family: monospace;
  }
</style>
