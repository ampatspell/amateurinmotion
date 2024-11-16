<script lang="ts">
  import GalleryRow from '$dummy/components/dark/inspector/gallery-row.svelte';
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import PagesRow from '$dummy/components/dark/inspector/pages-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import { GalleriesModel } from '$dummy/lib/galleries/galleries.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { IndexPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = $derived(page.settings as IndexPageSettingsModel);
  let properties = $derived(settings.properties);
  let gallery = $derived(properties.gallery);
  let pages = $derived(properties.pages);

  let galleries = new GalleriesModel({});
  $effect(() => subscribe(galleries));
</script>

<Inspector>
  <Section>
    <Header title="Index layout" />
  </Section>
  <Section>
    <GalleryRow label="Gallery" property={gallery} {galleries} />
    <PagesRow label="Pages" property={pages} />
  </Section>
</Inspector>
