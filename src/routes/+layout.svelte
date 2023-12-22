<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppShell>
	<svelte:fragment slot="footer">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<AppBar background="bg-orange-600 bg-opacity-20">

			<svelte:fragment slot="trail">
				<a class="btn btn-sm 2xl:flex xl:flex variant-ghost-surface border-red-400" href="/" rel="noreferrer">
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

<style>
	:global(html),
	:global(body) {
		background: #ffeadd;
		background: -moz-linear-gradient(45deg, #ffeadd 0%, #fecaca 100%, #fef2f2 100%);
		background: -webkit-linear-gradient(45deg, #ffeadd 0%, #fecaca 100%, #fef2f2 100%);
		background: linear-gradient(45deg, #ffeadd 0%, #fecaca 100%, #fef2f2 100%);
		height: 100%;
	}
</style>
