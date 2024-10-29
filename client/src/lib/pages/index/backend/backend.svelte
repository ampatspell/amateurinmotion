<script lang="ts">
  import Header from '$dummy/components/dark/inspector/header.svelte';
  import Inspector from '$dummy/components/dark/inspector/inspector.svelte';
    import Row from '$dummy/components/dark/inspector/row.svelte';
  import Section from '$dummy/components/dark/inspector/section.svelte';
  import type { PageModel } from '$dummy/lib/pages/page.svelte';

  let {}: { page: PageModel } = $props();
</script>

<Inspector>
  <Section>
    <Header title="Index layout" />
  </Section>
  <Section>
    <Row>
      This page is intentionally left blank.
    </Row>
  </Section>
</Inspector>
