<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="footer">
		<!-- App Bar -->
		<AppBar background="bg-blue-300 bg-opacity-30">
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface "
					href="/"
					rel="noreferrer"
				>
					<img class="max-h-12" src=".//book-alt.png" alt="Anxiety Ally Logo">
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/dashboard"
					rel="noreferrer"
				>
					<img class="max-h-12" src=".//home-icon.png" alt="Anxiety Ally Logo">
				</a>
				<!-- <a
					class="btn btn-sm variant-ghost-surface"
					href="/"
					rel="noreferrer"
				>
					<img src=".//user.png" alt="Anxiety Ally Logo">
				</a>
				<a
				class="btn btn-sm variant-ghost-surface"
				href="/"
				rel="noreferrer"
				>
					<img src=".//settings.png" alt="Anxiety Ally Logo">
				</a>	 -->
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
