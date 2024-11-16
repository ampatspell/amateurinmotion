<script lang="ts">
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import type { LayoutModel } from '$dummy/lib/layouts/layout.svelte';
  import { DefaultLayoutSettingsModel } from './settings.svelte';

  let { layout }: { layout: LayoutModel } = $props();
  let settings = $derived(layout.settingsAs<DefaultLayoutSettingsModel>());
  let properties = $derived(settings.properties);
</script>

<InputRow label="Title" property={properties.title} />
