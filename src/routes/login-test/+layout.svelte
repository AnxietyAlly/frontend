<script>
	export let data;
</script>

<header>
	<nav class="navbar is-primary px-4" aria-label="main navigation">
		<div class="navbar-brand pr-4">
			<span class="is-size-3 has-text-weight-semibold">SvelteKit + SQLite</span>
		</div>
		<div class="navbar-menu">
			<div class="navbar-start">
				<a href="/" class="navbar-item">Home</a>
			</div>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					{#if data?.username}
						<span>Hello {data.username}</span>
					{:else}
						<a href="/login" class="button is-primary">Log in</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>
</header>
<slot />
