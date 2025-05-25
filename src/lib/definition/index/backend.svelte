<script lang="ts">
  import ArrayRow from '$d2/components/dark/inspector/array-row.svelte';
  import InputRow from '$d2/components/dark/inspector/input-row.svelte';
  import NodeRow from '$d2/components/dark/inspector/node-row.svelte';
  import Section from '$d2/components/dark/inspector/section.svelte';
  import { optionalIntegerToString, toRequired } from '$d2/lib/base/utils/property.svelte';
  import type { NodesModel } from '$d2/lib/nodes/nodes.svelte';
  import type { IndexNodeModel } from './node.svelte';

  let { node, nodes }: { node: IndexNodeModel; nodes: NodesModel } = $props();

  let title = $derived(node.properties.title);
  let background = $derived(toRequired(node.properties.background, ''));
  let offset = $derived(optionalIntegerToString(node.properties.offset));
  let links = $derived(node.properties.links);
</script>

<Section>
  <InputRow label="Title" property={title} />
  <NodeRow label="Background image" property={background} {nodes} />
  <InputRow label="Background offset" property={offset} />
  <ArrayRow label="Links" model={links}>
    {#snippet item(link)}
      <InputRow label="Label" property={link.label} />
      <InputRow label="Path" property={link.path} />
    {/snippet}
  </ArrayRow>
</Section>
