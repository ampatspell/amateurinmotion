<script lang="ts">
  import { getAllUsers, type UserData } from '#lib/users/users.remote.js';
  import { page } from '$app/state';
  import { useListLayout } from '@ampatspell/tiny/layout/list/layout';
  import List from '@ampatspell/tiny/layout/list/list';
  import Label from '@ampatspell/tiny/list/item/label';
  import { getter } from '@ampatspell/tiny/utils/options';
  import { sentenceCase } from '@ampatspell/tiny/utils/string';
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();

  let id = $derived(page.params.id);
  let users = $derived(await getAllUsers());

  let layout = useListLayout({
    selected: getter(() => id),
    models: getter(() => users),
    item,
  });
</script>

{#snippet item(user: UserData)}
  <Label label={user.email} description={sentenceCase(user.role)} />
{/snippet}

<List {layout}>
  {@render children?.()}
</List>
