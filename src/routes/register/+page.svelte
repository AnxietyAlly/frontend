<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="container">
	<div class="flex flex-col items-center">
		<img class="w-40 h-100 mt-4" src="/anxietyally.png" alt="Anxiety Ally Logo" />
	</div>
	<div class="h-10 mt-2 flex justify-center mb-2">
		<h1 class="text-3xl font-bold text-red-400 text-opacity-90">Login or Register</h1>
	</div>
	<form class="h-10 mt-6" method="post" use:enhance>
		<div class="flex justify-center">
			<div class="w-5/6 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-4 rounded-md">
				<label class="text-xl font-bold text-red-400" for="name">Username</label>
				{#if form?.nameErrorEncountered}
					{#each form.nameErrorMessages as errorMessage, index}
						<label class="text-s text-red-600" for="password">{errorMessage}</label>
					{/each}
				{/if}
				<div class="flex items-center">
					<img class="w-10 h-10 mr-4" src="/circle-user.png" alt="Anxiety Ally Logo" />
					<input
						class="input my-2 border border-white rounded-lg"
						type="text"
						placeholder=""
						name="name"
						required
					/>
				</div>

				<label class="text-xl font-bold text-red-400" for="email">E-mail</label>
				{#if form?.emailErrorEncountered}
					{#each form.emailErrorMessages as errorMessage, index}
						<label class="text-s text-red-600" for="password">{errorMessage}</label>
					{/each}
				{/if}
				<div class="flex items-center">
					<img class="w-10 h-10 mr-4" src="/circle-envelope.png" alt="Anxiety Ally Logo" />
					<input
						class="input my-2 border border-white rounded-lg"
						type="email"
						placeholder=""
						name="email"
						required
					/>
				</div>

				<label class="text-xl font-bold text-red-400" for="password">Password</label>
				{#if form?.passwordErrorEncountered}
					{#each form.passwordErrorMessages as errorMessage, index}
						<label class="text-s text-red-600" for="password">{errorMessage}</label>
					{/each}
				{/if}
				<div class="flex items-center">
					<img class="w-10 h-10 mr-4" src="/user-lock.png" alt="Anxiety Ally Logo" />
					<input
						class="input my-2 border border-white rounded-lg"
						type="password"
						placeholder=""
						name="password"
						required
					/>
				</div>

				<br>
				<a href="/login">Already have an account? Click <span class="text-blue-600 border-b border-blue-600">here</span> to login!</a>
			</div>
		</div>
		<div class="flex justify-center items-center mt-14">
			<button
				class="w-40 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium mr-3 rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
				type="submit"
				formaction="?/register">Register</button
			>
		</div>
	</form>
</div>
