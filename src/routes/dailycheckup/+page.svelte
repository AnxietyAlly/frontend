<script>
	import { onMount } from 'svelte';
	// var output = document.getElementById("demo");
	// output.innerHTML = slider.value;

	// slider.oninput = function() {
		// 	output.innerHTML = this.value;
	// }

	// console.log("Hallo test" + slider.value);

	onMount(() => {
		const slider = document.getElementById("myRange");
		const descriptionInput = document.getElementById("description");
		const submitLink = document.getElementById("submit-link");

		const continueButton = document.getElementById('continue');
		const submitButton = document.getElementById('submit');

		const initialContent = document.getElementById('initialContent');
		const otherContent = document.getElementById('otherContent');

		continueButton.addEventListener('click', (event) => {
			initialContent.style.display = 'none';
			otherContent.style.display = 'block';
		});

		submitButton.addEventListener('click', (event) => {
			const user = "test";
			const timestamp = "test";
			const result = slider.value;
			const description = descriptionInput.value;

			if (result > 50) {
				submitLink.href="/dailycheckup-positive";
			}

			
		});
	});
</script>

<div class="min-h-screen bg-sky flex flex-col items-center">
	<a href="/"> <img class="w-5 h-5 absolute top-4 left-3" src=".//back.png" alt="back logo" /> </a>
	<div class="h-2" />
	<img class="w-40 h-100" src=".//dailycheckup.png" alt="Anxiety Ally Logo" />

	<div id="initialContent">
		<div class="h-20 mt-8 space-y-6">
			<div class="flex justify-center">
				<p class="text-xl font-semibold text-white">How are you feeling today?</p>
			</div>
		</div>

		<div class="flex justify-center">
			<input
				type="range"
				min="1"
				max="100"
				value="50"
				class="w-2/3 md:w-1/2 lg:w-1/3 h-4 rounded-md shadow bg-gray-200 bg-opacity-25 appearance-none focus:outline-none opacity-70 hover:opacity-100 border-2 border-gray-300"
				id="myRange"
				style="background-color: white; --thumb-color: darkgrey; --thumb-size: 24px;"
			/>
		</div>

		<p id="demo">
		
		</p>

		<div class=" flex justify-center">
			<div class="w-2/3 md:w-1/2 lg:w-1/3 rounded-md shadow bg-gray-200 bg-opacity-25 mt-4">
				<img class="w-auto h-20 mx-auto p-0" src=".//Emotion-scale.png" alt="Emotion scale" />
			</div>
		</div>

		<div class="h-20 mt-8 space-y-6">
			<div class="flex justify-center">
				<button
					id="continue"
					class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white button-color hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
				>
					Continue
				</button>
			</div>
		</div>

		<div class="h-20 mt-8 space-y-6">
			<div class="flex justify-center">
				<div class="w-2/3 md:w-1/2 lg:w-1/4 bg-gray-200 bg-opacity-25 p-4">
					<p class="text-xs text-center text-white italic">
						To understand your emotions, start by pausing and tuning into your physical sensations.
						Label the emotions you're experiencing (happy, sad, anxious, etc.) and consider what
						triggered them. Reflect on these feelings, perhaps by journaling, seeking feedback, or
						practicing mindfulness. This self-awareness can help you manage your emotions more
						effectively and make positive choices in response to them.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div id="otherContent" class="hidden">
		<div class="h-20 mt-8 space-y-6">
			<div class="flex justify-center">
				<p class="text-xl font-semibold text-white">Why are you feeling this way?</p>
			</div>
		</div>

		<div class="flex justify-center">
			<input
				id="description"
				type="text"
				class="opacity-75 h-44 w-80 rounded-md bg-opacity-50 text-left text-xs vertical-align: text-top"
				placeholder="Type here..."
			/>
		</div>

		<div class="h-20 mt-8 space-y-6">
			<div class="flex justify-center">
				<p class="text-xl font-semibold text-white">So how did you feel overall?</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-4 mb-5 mx-5 grid-rows-2" id="submit">
			<div class="place-self-auto">
				<a
					id="submit-link"
					href="/dailycheckup-negative"
					class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white button-color hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
				>
					Submit
				</a>
			</div>
		</div>
	</div>

	<style>
		.bg-sky {
			background-image: url('.//background-sky.png');
			background-position: center;
		}

		.button-color {
			background-color: #0c9eff;
		}

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
</div>
