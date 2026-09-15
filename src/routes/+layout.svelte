<script lang="ts">
  import { resolve } from '$app/paths';
  import { validatePrefix } from '@ampatspell/tiny/auth/guard/validate';
  import Entrypoint from '@ampatspell/tiny/entrypoint/entrypoint';
  import { setTiny } from '@ampatspell/tiny/entrypoint/tiny';

  let { children } = $props();

  setTiny({
    guard: validatePrefix({
      prefix: '/_admin',
      role: 'admin',
    }),
    files: {
      resolve: ({ id, variant }) => resolve('/files/[id]/[variant=variants]', { id, variant }),
    },
  });
</script>

<Entrypoint>
  {@render children()}
</Entrypoint>
