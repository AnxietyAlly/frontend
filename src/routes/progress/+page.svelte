<script>
	import Calendar from '../../lib/components/Calendar.svelte';

	export let data;
</script>

<div class="min-h-screen flex flex-col items-center">
	
	<img class="w-40 h-100 mt-5" src="/anxietyally.png" alt="Anxiety Ally Logo" />

	<div class="h-10 mt-2 flex justify-center lg:mt-6">
		<h1 class="text-3xl font-bold text-red-400 text-opacity-90">Progress</h1>
	</div>
	<Calendar bind:data/>
</div>
