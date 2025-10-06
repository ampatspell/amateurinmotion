<script lang="ts">
  import Gallery from '$lib/pages/gallery/gallery.svelte';

  let { data } = $props();
  let gallery = $derived(data.gallery);
</script>

<Gallery {gallery} />
