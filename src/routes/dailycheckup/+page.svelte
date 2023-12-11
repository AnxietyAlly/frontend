<script>
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	// var output = document.getElementById("demo");
	// output.innerHTML = slider.value;

	// slider.oninput = function() {
	// 	output.innerHTML = this.value;
	// }

	// console.log("Hallo test" + slider.value);

	onMount(() => {
		const slider = document.getElementById('myRange');
		const descriptionInput = document.getElementById('description');
		const submitLink = document.getElementById('submit-link');

		const continueButton = document.getElementById('continue');
		//const submitButton = document.getElementById('submit');

		const initialContent = document.getElementById('initialContent');
		const otherContent = document.getElementById('otherContent');

		continueButton.addEventListener('click', (event) => {
			initialContent.style.display = 'none';
			otherContent.style.display = 'block';
		});

		//submitButton.addEventListener('click', (event) => {
		//	const user = 'test';
		//	const timestamp = 'test';
		//	const result = slider.value;
		//	const description = descriptionInput.value;
		//
		//	if (result > 50) {
		//		submitLink.href = '/dailycheckup-positive';
		//	}
		//});
	});

	export let form;
</script>

<form method="POST" use:enhance>
	<div class="flex flex-col items-center">
		<img class="w-40 h-100 mt-4" src=".//anxietyally.png" alt="Anxiety Ally Logo" />
	</div>
	<div class="h-10 mt-2 flex justify-center">
		<h1 class="text-3xl font-bold text-red-400 text-opacity-90">Daily Checkup</h1>
	</div>


		<div id="initialContent">
			<div class="h-10 mt-4 space-y-4">
				<div class="flex justify-center">
					<p class="text-xl font-semibold text-stone-600">How are you feeling today?</p>
				</div>
			</div>

			<div class="flex justify-center">
				<input
					type="range"
					name="slider"
					min="1"
					max="100"
					value="50"
					class="w-2/3 md:w-1/2 lg:w-1/3 h-4 rounded-md shadow bg-white bg-opacity-50 appearance-none focus:outline-none opacity-70 hover:opacity-100 border-2 border-gray-300"
					id="myRange"
					style="background-color: white; --thumb-color: darkgrey; --thumb-size: 24px;"
				/>
			</div>

			<p id="demo" />

			<div class=" flex justify-center">
				<div class="w-2/3 md:w-1/2 lg:w-1/3 rounded-md shadow bg-white bg-opacity-50 mt-4">
					<img class="w-auto h-20 mx-auto p-0" src="/Emotion-scale.png" alt="Emotion scale" />
				</div>
			</div>

			<div class="h-20 mt-4 space-y-6">
				<div class="flex justify-center">
					<button
						id="continue"
						type="button"
						class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
					>
						Continue
					</button>
				</div>
			</div>

			<div class="h-20 mt-4 space-y-6">
				<div class="flex justify-center">
					<div class="w-3/4 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-4">
						<p class="text-xs text-center text-stone-600 italic">
							To understand your emotions, start by pausing and tuning into your physical
							sensations. Label the emotions you're experiencing (happy, sad, anxious, etc.) and
							consider what triggered them. Reflect on these feelings, perhaps by journaling,
							seeking feedback, or practicing mindfulness. This self-awareness can help you manage
							your emotions more effectively and make positive choices in response to them.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div id="otherContent" class="hidden">
			<div class="h-10 mt-4 space-y-8">
				<div class="flex justify-center">
					<p class="text-xl font-semibold text-stone-600">Why are you feeling this way?</p>
				</div>
			</div>

			<div class="flex justify-center">
				<input
					id="description"
					name="description"
					type="text"
					class="opacity-75 h-44 w-80 rounded-md bg-opacity-50 text-left text-xs vertical-align: text-top"
					placeholder="Type here..."
				/>
			</div>

			<div class="h-20 mt-4 space-y-6">
				<div class="flex justify-center">
					<button
						type="submit"
						class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
</form>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: var(--thumb-size, 16px);
		height: var(--thumb-size, 16px);
		background-color: var(--thumb-color, #fff);
		border-radius: 50%;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: var(--thumb-size, 16px);
		height: var(--thumb-size, 16px);
		background-color: var(--thumb-color, #fff);
		border-radius: 50%;
		cursor: pointer;
	}
</style>
