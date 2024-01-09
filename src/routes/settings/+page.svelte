<script>
	import { enhance } from '$app/forms';
	export let data;

	let isEditingInfo = false;

	let editButtonText = "Edit account details";
	let editButtonWidth = "w-40";

	function toggleIsEditingInfo() {
		if (isEditingInfo == false) {
			isEditingInfo = true;
			editButtonText = "Cancel";
			editButtonWidth = "w-16";
		} else {
			isEditingInfo = false;
			editButtonText = "Edit account details";
			editButtonWidth = "w-40";
		}
	}
</script>

<div class="flex flex-col items-center mt-4">
    <img class="w-40 h-40 md:w-60 md:h-60 lg:w-52 mt-4" src="/anxietyally.png" alt="Anxiety Ally Logo" />
</div>
<div class="h-10 mt-2 flex justify-center">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 text-opacity-90">Settings</h1>
</div>

<div class="mx-auto mt-2">
	<h2 class="font-bold ml-4">Account details</h2>

	{#key isEditingInfo}
		{#if isEditingInfo}
			<div>
				<form method="post" use:enhance>
					<div class="grid grid-cols-3 gap-x-6 m-2">
						<label class="justify-self-end" for="nameInput">Username:</label>
						<input
							id="nameInput"
							class="input border border-white rounded-lg justify-self-start col-span-2"
							type="text"
							placeholder=""
							value={data.name}
							name="name"
							required
						/>
					</div>

					<div class="grid grid-cols-3 gap-x-6 m-2">
						<label class="justify-self-end" for="emailInput">Email:</label>
						<input
							id="emailInput"
							class="input border border-white rounded-lg justify-self-start col-span-2"
							type="email"
							placeholder=""
							value={data.email}
							name="email"
							required
						/>
					</div>
				</form>
				<button type="submit" class="rounded-xl h-7 w-20 bg-red-400 m-2">Submit</button>
			</div>
		{:else}
			<div class="grid grid-cols-3 gap-x-6 my-2">
				<h3 class="justify-self-end">Username:</h3>
				<p class="justify-self-start col-span-2">{data.name}</p>

				<h3 class="justify-self-end">Email:</h3>
				<p class="justify-self-start col-span-2">{data.email}</p>
			</div>
		{/if}
	{/key}

	<button on:click={toggleIsEditingInfo} class="rounded-xl h-7 {editButtonWidth} bg-red-300 m-2">{editButtonText}</button>

	<!-- TODO: Properly add remove account button -->
	<div class="rounded-xl h-7 w-72 bg-red-400 m-2 mt-10">
		<p class="text-center">TEMP: REMOVE ACCOUNT GOES HERE</p>
	</div>
    
	<div class="grid grid-cols-3 gap-4 my-2 mx-5">
		<a
			href="/logout"
			class="rounded-xl col-span-3 bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-2"
			data-sveltekit-preload-data="off"
    		data-sveltekit-reload
		>
			<h3
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Log out
			</h3>
		</a>
	</div>
</div>

