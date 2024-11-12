<script lang="ts">
  let {
    isIndex,
    title,
    links,
  }: {
    isIndex: boolean;
    title: string;
    links: {
      url: string;
      name: string;
    }[];
  } = $props();
</script>

<div class="header" class:is-index={isIndex}>
  <a class="title" href="/">{title}</a>
  <div class="links">
    {#each links as link}
      <a href={link.url}>{link.name}</a>
    {/each}
  </div>
</div>

<style lang="scss">
  .header {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 10px;
    transition: 0.15s ease-in-out color;
    > .title {
      text-decoration: none;
      flex: 1;
    }
    > .links {
      display: flex;
      flex-direction: row;
      gap: 15px;
      > a {
        text-decoration: none;
      }
    }
    &.is-index {
      color: #fff;
    }
  }
</style>
