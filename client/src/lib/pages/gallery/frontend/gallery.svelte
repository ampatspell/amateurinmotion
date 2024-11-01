<script lang="ts">
  import type { GalleryModel } from '$dummy/lib/galleries/gallery.svelte';

  let { gallery }: { gallery: GalleryModel } = $props();
</script>

<div class="gallery">
  {#each gallery.images as image}
    <div class="image">
      <!-- svelte-ignore a11y_missing_attribute -->
      <img src={image.thumbnails['2048x2048'].url} draggable="false" />
    </div>
  {/each}
</div>

<style lang="scss">
  .gallery {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    @media (max-width: 768px) {
      gap: 10px;
    }
    > .image {
      max-width: 2048px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      @media (max-width: 768px) {
        height: auto;
      }
      > img {
        --w: calc(100% - 50px);
        --h: var(--w);
        display: block;
        object-fit: contain;
        width: var(--w);
        height: var(--w);
        @media (max-width: 768px) {
          --w: calc(100% - 10px);
          --h: 100%;
        }
      }
    }
  }
</style>
