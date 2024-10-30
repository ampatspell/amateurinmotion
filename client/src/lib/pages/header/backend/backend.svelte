<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import InputRow from '$dummy/components/dark/inspector/input-row.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';
  import type { HeaderPageSettingsModel } from '../settings.svelte';

  let { page }: { page: PageModel } = $props();
  let settings = $derived(page.settings as HeaderPageSettingsModel);
  let properties = $derived(settings.properties);
  let title = $derived(properties.title);
  let links = $derived(properties.links);
</script>

<Inspector>
  <Section>
    <Header title="Header layout" />
  </Section>
  <Section>
    <InputRow label="Title" property={title} />
    <InputRow label="Links" property={links} />
  </Section>
</Inspector>
