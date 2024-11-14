<script lang="ts">
  import './frontend.scss';
  import type { PageRuntimeModel } from '$dummy/lib/pages/runtime.svelte';
  import type { Snippet } from 'svelte';
  import Header from './header.svelte';
  import { DefaultLayoutSettingsModel } from '../settings.svelte';

  let {
    runtime,
    children,
  }: {
    runtime: PageRuntimeModel;
    children: Snippet;
  } = $props();

  let settings = $derived(runtime.layout.settingsAs<DefaultLayoutSettingsModel>());
  let title = $derived(settings.title);
  let path = $derived(runtime.path!);

  let links: { url: string; name: string }[] = [
    {
      url: '/zins-2',
      name: 'Zīns #2',
    },
  ];
</script>

<div class="theme">
  <div class="header">
    <Header {title} {links} {path} />
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .theme {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: 'Raleway', sans-serif;
    font-size: 13px;
    font-weight: 400;
    cursor: default;
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
