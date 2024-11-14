<script lang="ts">
  let {
    title,
    links,
    path,
  }: {
    title: string;
    path: string;
    links: {
      url: string;
      name: string;
    }[];
  } = $props();

  let isIndex = $derived(path === '/');
</script>

<div class="header" class:is-index={isIndex}>
  <a class="title" href="/">{title}</a>
  <div class="links">
    {#each links as link}
      <a class:selected={link.url === path} href={link.url}>{link.name}</a>
    {/each}
  </div>
</div>

<style lang="scss">
  .header {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    padding: 30px;
    > .title {
      font-size: 21px;
      font-weight: 500;
      text-decoration: none;
      flex: 1;
    }
    > .links {
      display: flex;
      flex-direction: row;
      gap: 10px;
      > a {
        text-decoration: none;
        &.selected {
          text-decoration: underline;
        }
      }
    }
    &.is-index {
      color: #fff;
      > .links {
        > a {
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
</style>
