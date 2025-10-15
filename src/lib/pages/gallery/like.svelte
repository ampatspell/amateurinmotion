<script lang="ts">
  import MynauiHeartCircleSolid from '$lib/components/icons/mynaui--heart-circle-solid.svelte';
  import MynauiHeartCircle from '$lib/components/icons/mynaui--heart-circle.svelte';

  let liked = $state(false);
  let onclick = () => {
    liked = !liked;
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="like" {onclick}>
  {#if liked}
    <MynauiHeartCircleSolid />
  {:else}
    <MynauiHeartCircle />
  {/if}
</div>

<style lang="scss">
  .like {
    width: 30px;
    height: 30px;
  }
</style>
