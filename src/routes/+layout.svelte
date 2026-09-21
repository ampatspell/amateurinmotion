<script lang="ts">
  import { resolve } from '$app/paths';
  import { validatePrefix } from '@ampatspell/tiny/auth/guard/validate';
  import Hello from '@ampatspell/tiny/hello/hello';
  import { setTiny } from '@ampatspell/tiny/hello/tiny';

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

<Hello>
  {@render children()}
</Hello>
