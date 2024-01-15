<script>
	import { enhance } from '$app/forms';
	export let data;

	let isEditingInfo = false;
	let isTryingToRemoveAccount = false;

	let editButtonText = "Edit account details";
	let editButtonWidth = "w-48";

	function toggleIsEditingInfo() {
		if (isEditingInfo == false) {
			isEditingInfo = true;
			editButtonText = "Cancel";
			editButtonWidth = "w-16";
		} else {
			isEditingInfo = false;
			editButtonText = "Edit account details";
			editButtonWidth = "w-48";
		}
	}

	function handleSubmit() {
		setTimeout(() => {
			toggleIsEditingInfo();
		}, 10);
	}

	function toggleIsTryingToRemoveAccount() {
		if (isTryingToRemoveAccount == false) {
			isTryingToRemoveAccount = true;
		} else {
			isTryingToRemoveAccount = false;
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

					<div class="hidden">
						<label class="justify-self-end" for="hiddenOldEmailInput">Old email:</label>
						<input
							id="hiddenOldEmailInput"
							class="input border border-white rounded-lg justify-self-start col-span-2"
							type="email"
							placeholder=""
							value={data.email}
							name="oldEmail"
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

					<div class="grid grid-cols-3 gap-x-6 m-2">
						<label class="justify-self-end" for="passwordInput">Password:</label>
						<input
							id="passwordInput"
							class="input border border-white rounded-lg justify-self-start col-span-2"
							type="password"
							placeholder="Your new password here"
							name="password"
							required
						/>
					</div>
					
					<button on:click={handleSubmit} type="submit" formaction="?/updateAccount" class="rounded-xl h-9 w-20 bg-red-400 m-2">Submit</button>
				</form>
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

	{#key isEditingInfo}
		<button on:click={toggleIsEditingInfo} class="rounded-xl {editButtonWidth} bg-red-300 m-2">
			{#if isEditingInfo}
				<div class="m-1">
					<p class="self-center justify-self-end">{editButtonText}</p>
				</div>
			{:else}
				<div class="flex flex-auto m-1 gap-2">
					<img src="/edit-account.png" alt="Account edit icon" class="w-8 h-8">
					<p class="self-center justify-self-end">{editButtonText}</p>
				</div>
			{/if}
		</button>
	{/key}
    
	<a
		href="/logout"
		class="rounded-xl bg-red-400 m-2 mt-10 w-28 flex flex-auto gap-2"
		data-sveltekit-preload-data="off"
		data-sveltekit-reload
	>
		<img src="/logout.png" alt="Logout icon" class="w-7 h-7 my-2 ml-2">
		<h3 class="self-center justify-self-end my-2">Log out</h3>
	</a>

	<button on:click={toggleIsTryingToRemoveAccount} class="rounded-xl bg-red-500 m-2 mt-20 flex flex-auto gap-2">
		<img src="/trash.png" alt="Trash can icon" class="w-8 h-8 my-2 ml-2">
		<p class="my-2 mr-2 self-center justify-self-end">Remove account</p>
	</button>

	{#key isTryingToRemoveAccount}
		{#if isTryingToRemoveAccount}
			<div>
				<p class="text-center mt-4">Are you sure you want to remove your account?</p>
				<div class="grid grid-cols-3 my-2">
					<form class="col-span-2" method="post" use:enhance>
						<label class="hidden" for="hiddenEmailInput">Email</label>
						<input
							id="hiddenEmailInput"
							class="hidden"
							type="email"
							placeholder=""
							value={data.email}
							name="email"
							required
						/>

						<button 
							type="submit" 
							formaction="?/removeAccount" 
							class="rounded-xl h-7 w-48 bg-red-300 m-2 col-span-2"
						>
							Yes, remove my account
						</button>
					</form>
					<button on:click={toggleIsTryingToRemoveAccount} class="rounded-xl h-7 w-20 bg-red-400 m-2">Cancel</button>
				</div>
			</div>
		{/if}
	{/key}
</div>

