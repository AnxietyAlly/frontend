<script>
	export let data;
</script>

<div class="flex flex-col items-center mt-4">
    <img class="w-40 h-40 md:w-60 md:h-60 lg:w-52 mt-4" src="/anxietyally.png" alt="Anxiety Ally Logo" />
</div>
<div class="h-10 mt-2 flex justify-center">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 text-opacity-90">Settings</h1>
</div>

<div class="mx-auto mt-2">
	<h2 class="font-bold ml-4">Account details</h2>

	<div class="grid grid-cols-3 gap-x-6 my-2">
		<h3 class="justify-self-end">Username:</h3>
		<p class="justify-self-start col-span-2">{data.name}</p>

		<h3 class="justify-self-end">Email:</h3>
		<p class="justify-self-start col-span-2">{data.email}</p>
	</div>

	<!-- TODO: Properly add remove account button -->
	<div class="rounded-xl h-8 w-72 bg-red-400">
		<p class="text-center">TEMP: REMOVE ACCOUNT GOES HERE</p>
	</div>
    
	<div class="grid grid-cols-3 gap-4 my-2 mx-5">
		<a
			href="/logout"
			class="rounded-xl col-span-3 bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-2"
			data-sveltekit-preload-data="off"
    		data-sveltekit-reload
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Log out
			</h2>
		</a>
	</div>
</div>

