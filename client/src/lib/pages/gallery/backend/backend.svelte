<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { GalleryPageSettingsModel } from '../settings.svelte';
  import Properties from './properties.svelte';
  import FolderGrid from '$dummy/components/backend/assets/grid/folder-grid.svelte';

  let { page }: { page: PageModel } = $props();

  let settings = $derived(page.settingsAs<GalleryPageSettingsModel>());
  let folder = $derived(settings.folder);
</script>

<Inspector>
  <Section>
    <Header title="Gallery layout" />
  </Section>
  <Properties {settings} />
  {#if folder}
    <Section>
      <Row>
        <FolderGrid {folder} isEditing={false} />
      </Row>
    </Section>
  {/if}
</Inspector>
