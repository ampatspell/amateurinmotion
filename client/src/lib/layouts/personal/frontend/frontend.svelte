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
  let page = $derived(runtime.page);
  let layoutTitle = $derived(settings.title);
  let path = $derived(runtime.path!);

  let title = $derived.by(() => {
    if (path === '/') {
      return layoutTitle;
    } else {
      let pageTitle = page?.name ?? runtime.path;
      if (pageTitle === layoutTitle) {
        return layoutTitle;
      }
      return `${layoutTitle} • ${pageTitle}`;
    }
  });

  let scrollY = $state<number>();

  let opacity = $derived.by(() => {
    let max = 300;
    let y = Math.min(scrollY ?? 0, max);
    return 1 - y / max;
  });
</script>

<svelte:window bind:scrollY />

<svelte:head>
  {#if title}
    <title>{title}</title>
  {/if}
</svelte:head>

<div class="theme">
  <div class="header" style:--opacity={opacity}>
    <Header title={layoutTitle} {path} />
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
    > .header {
      --height: 80px;
      padding-bottom: var(--height);
      opacity: var(--opacity);
    }
    > .content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
