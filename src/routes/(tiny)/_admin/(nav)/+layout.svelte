<script lang="ts">
  import TablerCalendar from '#lib/icons/tabler--calendar.svelte';
  import TablerHome from '#lib/icons/tabler--home.svelte';
  import { resolve } from '$app/paths';
  import Backend from '@ampatspell/tiny/backend/backend';
  import { setBackend } from '@ampatspell/tiny/backend/context';
  import { equals } from '@ampatspell/tiny/backend/navigation/model';
  import Floaters from '@ampatspell/tiny/floating/floaters/floaters';
  import { setFloaters } from '@ampatspell/tiny/floating/floaters/model';
  import TablerCloud from '@ampatspell/tiny/icons/tabler--cloud';
  import TablerUser from '@ampatspell/tiny/icons/tabler--user';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  setBackend({
    items: [
      {
        name: 'Public',
        icon: TablerCloud,
        route: resolve('/(tiny)'),
        cmp: equals,
      },
      {
        name: 'Home',
        icon: TablerHome,
        route: resolve('/(tiny)/_admin/(nav)/home'),
      },
      {
        name: 'Dailies',
        icon: TablerCalendar,
        route: resolve('/(tiny)/_admin/(nav)/dailies'),
        select: (id) => resolve('/(tiny)/_admin/(nav)/dailies/[id]', { id }),
      },
      {
        name: 'Users',
        icon: TablerUser,
        route: resolve('/(tiny)/_admin/(nav)/users'),
        select: (id) => resolve('/(tiny)/_admin/(nav)/users/[id]', { id }),
      },
    ],
  });

  setFloaters();
</script>

<svelte:head>
  <title>Tiny _admin</title>
</svelte:head>

<Backend>
  {@render children()}
</Backend>

<Floaters />
