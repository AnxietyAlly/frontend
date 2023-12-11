<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<style>
  /* Set the background color of the whole page */
  :global(html),
  :global(body) {
	background: #FFEADD;
	background: -moz-linear-gradient(45deg, #FFEADD 0%, #FECACA 100%, #FEF2F2 100%);
	background: -webkit-linear-gradient(45deg, #FFEADD 0%, #FECACA 100%, #FEF2F2 100%);
	background: linear-gradient(45deg, #FFEADD 0%, #FECACA 100%, #FEF2F2 100%);
    height: 100%; /* Ensure body fills the viewport */
  }
</style>


  <AppShell>
    <svelte:fragment slot="footer">
      <AppBar background="bg-orange-600 bg-opacity-20">
        <svelte:fragment slot="trail">
          <a class="btn btn-sm variant-ghost-surface border-red-400" href="/" rel="noreferrer">
            <img class="max-h-12" src="/book.png" alt="Book icon" />
          </a>
          <a class="btn btn-sm variant-ghost-surface" href="/dashboard" rel="noreferrer">
            <img class="max-h-12" src="/home.png" alt="Home icon" />
          </a>
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>
    <slot />
  </AppShell>
