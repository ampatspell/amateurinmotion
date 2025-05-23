<script lang="ts">
  import InputRow from '$d2/components/dark/inspector/input-row.svelte';
  import Section from '$d2/components/dark/inspector/section.svelte';
  import { toRequired } from '$d2/lib/base/utils/property.svelte';
  import type { GalleriesNodeModel } from './node.svelte';

  let { node }: { node: GalleriesNodeModel } = $props();

  let title = $derived(toRequired(node.properties.title, ''));
</script>

<Section>
  <InputRow label="Title" property={title} />
</Section>
