<script lang="ts">
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { IndexPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();

  let settings = $derived(page.settings as IndexPageSettingsModel);
  let gallery = $derived(settings.gallery);
  let image = $derived(gallery?.images[0].thumbnails['2048x2048'].url);
</script>

<div class="index">
  <div class="image">
    <div class="content" style:--url="url('{image}')"></div>
  </div>
  <div class="footer">
    <p>Hey there, I'm Arnis.</p>
    <p>Wanna <a href="mailto:ampatspell@gmail.com">say hi</a>?</p>
  </div>
</div>

<style lang="scss">
  .index {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    > .image {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      display: flex;
      > .content {
        flex: 1;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: var(--url);
      }
    }
    > .footer {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-shadow: 0 1px 10px fade-out(#000, 0.5);
    }
  }
</style>
