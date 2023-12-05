<script>
	let currentDate = new Date();
	let currentMonth = currentDate.getMonth();
	let currentYear = currentDate.getFullYear();
	let selectedDate = null;

	function updateMonth(amount) {
		currentMonth += amount;

		if (currentMonth < 0) {
			currentMonth = 11;
			currentYear--;
		} else if (currentMonth > 11) {
			currentMonth = 0;
			currentYear++;
		}

		// Update currentDate based on the new month and year
		currentDate = new Date(currentYear, currentMonth, 1);
	}

	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	// Function to get an array of numbers from 1 to n
	function range(n) {
		return Array.from({ length: n }, (_, i) => i + 1);
	}

	function handleDateClick(day) {
		// Set the selected date when a date is clicked
		selectedDate = new Date(currentYear, currentMonth, day);
		// You can add logic here to display more information based on the selected date

		console.log('Selected date:', selectedDate);
	}
</script>

<div>
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
			<a href="#top" class="calendar-day" on:click={() => handleDateClick(day)}>
				{day}
			</a>
		{/each}
	</div>
</div>

<style>
	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		margin-bottom: 20px;
		max-width: 400px; /* Limit the width for small screens */
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
		width: 48%; /* Adjust button width for small screens */
	}

	button:hover {
		background-color: #45a049;
	}

	@media only screen and (max-width: 600px) {
		/* Adjust styles for screens with a maximum width of 600px (typical for phones) */
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
	}
</style>
