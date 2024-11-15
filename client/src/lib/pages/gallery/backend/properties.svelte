<script lang="ts">
  import GalleryRow from '$dummy/components/dark/inspector/gallery-row.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { GalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
  import type { GalleryPageSettingsModel } from '../settings.svelte';

  let { settings }: { settings: GalleryPageSettingsModel } = $props();

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let gallery = $derived(properties.gallery);

  let galleries = new GalleriesModel({});
  $effect(() => subscribe(galleries));
</script>

<Section>
  <InputRow label="Title" property={title} />
  <GalleryRow label="Gallery" property={gallery} {galleries} />
</Section>
