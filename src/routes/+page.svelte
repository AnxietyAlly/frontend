<script>
	export let data;
</script>

<div class="flex flex-col items-center">
	<img class="w-60 h-100 mt-24 lg:w-52 lg:mt-5" src="/anxietyally.png" alt="Anxiety Ally Logo" />
</div>

<div class="h-10 mt-2 flex justify-center lg:mb-5 lg:mt-6">
	<h1 class="text-3xl font-bold text-red-400 text-opacity-90 lg:text-4xl">Anxiety Ally</h1>
</div>

<div class="h-12 mt-2 space-y-6">
	<div class="flex justify-center lg:h-20">
		<div class="w-2/3 md:w-1/2 lg:w-1/4">
			<p class="text-xs text-center text-stone-600 italic lg:text-2xl">
				"AnxietyAlly: Your Complete Anxiety Companion. Identify and track your daily progress. Your
				trusted ally on the path to serenity."
			</p>
		</div>
	</div>
</div>

<h1 class="hidden">AnxietyAlly</h1>
<div class="rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 flex items-center justify-center h-10 m-6 lg:h-14 lg:flex lg:items-center lg:justify-center lg:w-80 lg:m-auto lg:mt-24">
	{#if data?.name}
		<a
			href="/questionnaire"
			class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white button-color md:py-4 md:text-lg lg:w-fit"
		>
			Take the first steps {data.name}!
		</a>
	{:else}
		<a
			href="/login"
			class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white button-color md:py-4 md:text-lg md:px-10"
			>Log in</a
		>
		<!-- <a href="/login" class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white button-color md:py-4 md:text-xl md:px-10">Log in</a> -->
	{/if}
</div>
<!-- </div> -->
