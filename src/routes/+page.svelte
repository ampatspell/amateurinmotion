<script lang="ts">
  import Tiny from '@ampatspell/tiny/tiny';
  import { getHome } from './(tiny)/_admin/(nav)/home/home.remote';
  import { useFiles } from '@ampatspell/tiny/files';
  import { url } from '@ampatspell/tiny/utils/style';
  import { resolve } from '$app/paths';
  let data = $derived(await getHome());
  let files = useFiles();
  let background = $derived(files.asRemote(data.background));
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Tiny>
  <div class="page" style:--url={url(background?.variant.named('2048x2048').url)}>
    <div class="content">
      <div class="title">{data.title}</div>
      <div class="links">
        <div class="link">
          <a href={resolve('/daily')}>daily</a>
        </div>
      </div>
    </div>
  </div>
</Tiny>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    > .content {
      flex: 1;
      background: #000 var(--url) center / cover no-repeat;
      margin: -20px;
      padding: calc(20px + 50px);
      color: #fff;
      display: flex;
      flex-direction: column;
      gap: 20px;
      > .title {
        font-size: 21px;
      }
      > .links {
        display: flex;
        flex-direction: column;
        > .link {
          > a {
            text-decoration: none;
            font-size: var(--tiny-font-size-small);
          }
        }
      }
    }
  }
</style>
