<script lang="ts">
  import LucideCloudDownload from '$lib/components/icons/lucide--cloud-download.svelte';
  import type { GalleryModel } from '$lib/models/galleries.svelte';
  import { formatBytes } from '$lib/utils/number';

  let { gallery }: { gallery: GalleryModel } = $props();

  let download = $derived(gallery.download);

  let onclick = () => {
    if (download) {
      window.location.href = download.url;
    }
  };
</script>

{#if download}
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="download" role="button" {onclick}>
    <div class="info">
      <div class="filename">{download.filename}</div>
      <div class="size">{formatBytes(download.size)}</div>
    </div>
    <div class="icon">
      <LucideCloudDownload />
    </div>
  </div>
{/if}

<style lang="scss">
  @use 'sass:color';
  .download {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    padding: 10px 15px;
    border: 1px solid transparent;
    transition: 0.3s ease-in-out all;
    cursor: pointer;
    > .info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      > .filename {
        font-weight: 600;
      }
      > .size {
        font-size: 12px;
      }
      opacity: 0;
      transition: 0.3s ease-in-out all;
    }
    > .icon {
      --size: 21px;
      width: var(--size);
      height: var(--size);
      :global(svg) {
        width: 100%;
        height: 100%;
      }
    }
    &:hover {
      border: 1px solid #eee;
      background: #fff;
      box-shadow:
        0 5px 10px color.adjust(#000, $alpha: -0.95),
        0 20px 40px color.adjust(#000, $alpha: -0.9);
      > .info {
        opacity: 1;
      }
    }
  }
</style>
