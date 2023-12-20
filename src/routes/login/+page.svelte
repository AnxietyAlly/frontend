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
				<label class="text-xl font-bold text-red-400">Username</label>

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

				<label class="text-xl font-bold text-red-400">E-mail</label>

				<div class="flex items-center">
					<img class="w-10 h-10 mr-4" src="/circle-envelope.png" alt="Anxiety Ally Logo" />
					<input
						class="input my-2 border border-white rounded-lg"
						type="text"
						placeholder=""
						name="email"
						required
					/>
				</div>

				<label class="text-xl font-bold text-red-400">Password</label>

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
				{#if form?.errorMessage}
					<div class="has-text-danger my-2">{form.errorMessage}</div>
				{/if}
			</div>
		</div>
		<div class="flex justify-center items-center mt-14">
			<button
				class="w-40 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium mr-3 rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
				type="submit"
				formaction="?/register">Register</button
			>
			<button
				class="w-40 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium mr-3 rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
				type="submit"
				formaction="?/login">Login</button
			>
		</div>
	</form>
</div>
