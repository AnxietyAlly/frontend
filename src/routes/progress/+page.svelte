<script>
	import Calendar from '../../lib/components/Calendar.svelte';
</script>

<div class="min-h-screen bg-sky flex flex-col items-center">
	<a href="/dashboard">
		<img class="w-5 h-5 absolute top-4 left-3" src=".//back.png" alt="back logo" />
	</a>
	<img class="w-40 h-100 mt-5" src=".//anxietyAllyLogo.png" alt="Anxiety Ally Logo" />

	<h1 class="text-3xl text-white font-bold mb-5">Progress</h1>
	<Calendar />
</div>

<style>
	.bg-sky {
		background-image: url('.//background-sky.png');
		background-position: center;
	}
</style>
