<script lang="ts">
  import { GalleryModel } from '$lib/models/galleries.svelte.js';
  import Gallery from '$lib/pages/gallery/gallery.svelte';

  let { data } = $props();
  let gallery = $derived(GalleryModel.build(data.gallery));
</script>

<Gallery {gallery} />
