<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();
	let selectedDate = null;
	let selectedDateNumber = null;
	let selectedResult = null;

	function updateMonth(amount) {
		currentMonth += amount;

		if (currentMonth < 0) {
			currentMonth = 11;
			currentYear--;
		} else if (currentMonth > 11) {
			currentMonth = 0;
			currentYear++;
		}

		currentDate = new Date(currentYear, currentMonth, 1);

		setTimeout(() => {
			emptyCalender();
		}, 20);
		setTimeout(() => {
			fillCalendar();
		}, 25);
	}

	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	function range(n) {
		return Array.from({ length: n }, (_, i) => i + 1);
	}

	function handleDateClick(day) {
		selectedDate = new Date(currentYear, currentMonth, day);
		selectedDateNumber = selectedDate.getDate();
		selectedResult = allDailyCheckupResultsFromDB.find(result => {
			if (currentMonth + 1 < 10) {
				if (day < 10) {
					return result.data.date.substr(0, 8) == `${currentYear}0${currentMonth + 1}0${day}`;
				}
				return result.data.date.substr(0, 8) == `${currentYear}0${currentMonth + 1}${day}`;
			} else if (day < 10) {
				return result.data.date.substr(0, 8) == `${currentYear}${currentMonth + 1}0${day}`;
			} else {
				return result.data.date.substr(0, 8) == `${currentYear}${currentMonth + 1}${day}`;
			}
		});

		document.getElementById('initialContent').style.display = 'none';
		document.getElementById('information-section').style.display = 'block';
	}

	function refreshPage() {
		selectedDate = null;
		selectedDateNumber = null;
		selectedResult = null;

		document.getElementById('initialContent').style.display = 'block';
		document.getElementById('information-section').style.display = 'none';
	}

	let allDailyCheckupResultsFromDB = [];

	/**
	 * Async function to get the data from the SWAPI api
	 * @returns - returns a promise
	 */
	async function getApiData(url) {
		try {
			let response = await fetch(url);
			let returnedResponse = await response.json();
			return returnedResponse;
		} catch (err) {
			console.error('Error: ', err);
		}
	}
	async function getDailyCheckupResultsOfMonth() {
		const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
		const userId = 1;

		let dailyCheckupResultsFromDatabase = [];
		if (browser) {
			const dailyCheckupResultLinksJSON = await getApiData(
				`http://localhost:3010/progressApi/user/${userId}/dateRange/${currentYear}${currentMonth + 1}01000000/${currentYear}${currentMonth + 1}${daysInCurrentMonth}235959/dailyCheckupResults`
			);

			const dailyCheckupResultLinks = dailyCheckupResultLinksJSON.data;

			for (let i = 0; i < dailyCheckupResultLinks.length; i++) {
				const question = await getApiData(
					`http://localhost:3010/progressApi${dailyCheckupResultLinks[i]}`
				);

				dailyCheckupResultsFromDatabase.push(question);
			}
			const allDailyCheckupResultsPromise = await Promise.all(dailyCheckupResultsFromDatabase);
			return allDailyCheckupResultsPromise;
		}
	}

	async function fillCalendar() {
		allDailyCheckupResultsFromDB = await getDailyCheckupResultsOfMonth();
		allDailyCheckupResultsFromDB.forEach(result => {
			if (result.data.result <= 50) {
				document.getElementById(result.data.date.substr(0, 8)).style.backgroundColor = "red";
			} else {
				document.getElementById(result.data.date.substr(0, 8)).style.backgroundColor = "green";
			}
		});
		
		console.log(allDailyCheckupResultsFromDB);
	}

	function emptyCalender() {
		const days = document.getElementsByClassName("calendar-day");
		for(let day of days) {
			day.style.backgroundColor = "transparent";
		}
	}

	onMount(async () => {
		fillCalendar();
	});
</script>

<div id="initialContent">
	<div class="nav-buttons">
		<button class="flex-none" on:click={() => updateMonth(-1)}>Previous Month</button>

		<button class="flex-none" on:click={() => updateMonth(1)}>Next Month</button>
	</div>
	<div>
		<h2 class="text-white">
			{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}
		</h2>
	</div>
	<div class="calendar">
		{#each range(getDaysInMonth(currentYear, currentMonth)) as day (day)}
			{#if currentMonth + 1 < 10}
				{#if day < 10}
					<a href="#top" class="calendar-day" on:click={() => handleDateClick(day)} id="{String(currentYear)}0{String((currentMonth + 1))}0{String(day)}">
						{day}
					</a>
				{:else}
					<a href="#top" class="calendar-day" on:click={() => handleDateClick(day)} id="{String(currentYear)}0{String((currentMonth + 1))}{String(day)}">
						{day}
					</a>
				{/if}
			{:else if day < 10}
				<a href="#top" class="calendar-day" on:click={() => handleDateClick(day)} id="{String(currentYear)}{String((currentMonth + 1))}0{String(day)}">
					{day}
				</a>
			{:else}
				<a href="#top" class="calendar-day" on:click={() => handleDateClick(day)} id="{String(currentYear)}{String((currentMonth + 1))}{String(day)}">
					{day}
				</a>
			{/if}
		{/each}
	</div>
</div>

<div class="h-20 mt-8 space-y-6" id="information-section" style="display: none;">
	{#each range(getDaysInMonth(currentYear, currentMonth)) as day (day)}
		{#if day == selectedDateNumber}
			{#if selectedResult !== null && selectedResult !== undefined}
				<h3 class="text-white text">Selected Date:</h3>
				<p class="text-white">{selectedDate ? selectedDate.toDateString() : 'No date selected'}</p>
				<h3 class="text-white text">You rated your mood as:</h3>
				{#if selectedResult.data.result <= 20}
					<img class="w-5 h-5" src="/AngryEmoji.png" alt="Angry emoji"/>
				{:else if selectedResult.data.result <= 40}
					<img class="w-5 h-5" src="/SemiAngryEmoji.png" alt="Semi angry emoji"/>
				{:else if selectedResult.data.result <= 60}
					<img class="w-5 h-5" src="/NeutralEmoji.png" alt="Neutral emoji"/>
				{:else if selectedResult.data.result <= 80}
					<img class="w-5 h-5" src="/HappyEmoji.png" alt="Happy emoji"/>
				{:else if selectedResult.data.result <= 100}
					<img class="w-5 h-5" src="/VeryHappyEmoji.png" alt="Very happy emoji"/>
				{/if}
				<p class="text-white">{selectedResult.data.result}/100</p>
				<h3 class="text-white text">Your description:</h3>
				{#if selectedResult.data.description !== null && selectedResult.data.description !== undefined && selectedResult.data.description !== ""}
					<p class="text-white">{selectedResult.data.description}</p>
				{:else}
					<p class="text-white">We haven't found a description. You might not have left a description.</p>
				{/if}
			{:else}
				<p class="text-white">We weren't able to find any data for this date. You might not have done the daily description that day.</p>
			{/if}
		{/if}
	{/each}
	<button
		class="w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white button-color hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
		on:click={() => refreshPage()}>Back</button
	>
</div>

<style>
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		margin-bottom: 20px;
		max-width: 400px;
		width: 100%;
	}

	.calendar-day {
		padding: 8px;
		border: 1px solid #ddd;
		text-align: center;
	}

	.nav-buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	button {
		padding: 10px;
		cursor: pointer;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		transition: background-color 0.3s ease;
		width: 48%;
	}

	button:hover {
		background-color: #45a049;
	}

	.calendar {
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
		max-width: 100%;
	}

	.nav-buttons {
		align-items: center;
		justify-content: space-between;
	}

	button {
		margin-bottom: 8px;
	}
</style>
