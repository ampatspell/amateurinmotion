<script lang="ts">
  import { getIndex, type IndexData } from '$lib/remote/index.remote';
  import Json from '@ampatspell/base/components/json';

  let index = $derived<IndexData>(await getIndex());
</script>

<div class="page">
  <Json data={index} />
</div>

<style lang="scss">
  .page {
    padding: 0 30px;
  }
</style>
