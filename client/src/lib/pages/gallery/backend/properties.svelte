<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import { subscribe } from '$dummy/lib/firebase/fire/subscriber.svelte';
  import type { GalleryPageSettingsModel } from '../settings.svelte';

  let { settings }: { settings: GalleryPageSettingsModel } = $props();
  import FolderRow from '$dummy/components/dark/inspector/folder-row.svelte';
  import { FoldersModel } from '$dummy/lib/assets/folders.svelte';

  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let gallery = $derived(properties.folder);

  let folders = FoldersModel.build();
  $effect(() => subscribe(folders));
</script>

<Section>
  <InputRow label="Title" property={title} />
  <FolderRow label="Folder" property={gallery} {folders} />
</Section>
