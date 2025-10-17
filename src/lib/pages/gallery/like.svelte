<script lang="ts">
  import MynauiHeartCircleSolid from '$lib/components/icons/mynaui--heart-circle-solid.svelte';
  import MynauiHeartCircle from '$lib/components/icons/mynaui--heart-circle.svelte';
  import type { GalleryFileModel } from '$lib/models/galleries.svelte';
  import { getGalleryLikesContext } from '$lib/models/likes.svelte';

  let { file }: { file: GalleryFileModel } = $props();

  let likes = $derived(getGalleryLikesContext().current);
  let id = $derived(file.id);
  let liked = $derived(likes?.isLiked(id) ?? false);
  let onclick = async () => {
    if (likes) {
      await likes.setLiked(fetch, id, !liked);
    }
  };
</script>

{#if likes}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class={['like', liked && 'liked']} {onclick}>
    {#if liked}
      <MynauiHeartCircleSolid />
    {:else}
      <MynauiHeartCircle />
    {/if}
  </div>
{/if}

<style lang="scss">
  .like {
    --s: 31px;
    width: var(--s);
    height: var(--s);
    transition: 0.15s ease-in-out color;
    &.liked {
      color: #c1121f;
    }
  }
</style>
