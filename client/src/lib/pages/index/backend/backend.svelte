<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import PagesRow from '$dummy/components/dark/inspector/pages-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { IndexPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();
  import FolderRow from '$dummy/components/dark/inspector/folder-row.svelte';
  import { FoldersModel } from '$dummy/lib/assets/folders.svelte';
  let settings = $derived(page.settings as IndexPageSettingsModel);
  let properties = $derived(settings.properties);
  let gallery = $derived(properties.gallery);
  let pages = $derived(properties.pages);

  let folders = new FoldersModel({});
  $effect(() => subscribe(folders));
</script>

<Inspector>
  <Section>
    <Header title="Index layout" />
  </Section>
  <Section>
    <FolderRow label="Folder" property={gallery} {folders} />
    <PagesRow label="Pages" property={pages} />
  </Section>
</Inspector>
