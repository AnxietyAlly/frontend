<script>
	let comments = [
		{
			user: 'User123',
			text: "Reading others' stories here has given me hope during my darkest days. It's incredible how we can support each other through shared experiences."
		},
		{
			user: 'User456',
			text: "PTSD can be isolating, but finding this community has been a game-changer."
		}
	];

	let newComment = '';

	const submitComment = () => {
		if (newComment.trim() !== '') {
			comments = [...comments, { user: 'NewUser', text: newComment }];
			newComment = '';
		}
	};
</script>

<div class="flex flex-col items-center">
	<a href="/forums-ptsd">
		<img class="w-10 h-10 mt-2 ml-7 fixed top-5 left-0" src="/back.png" alt="back button" />
	</a>
	<img class="w-40 h-100 mt-4" src="/anxietyally.png" alt="Anxiety Ally Logo" />
</div>
<div class="h-10 mt-8 flex justify-center items-center">
    <h1 class="text-3xl font-bold text-red-400 text-opacity-90 text-center">
        Personal Stories and Experiences
    </h1>
</div>

<div class="mb-30  ml-5 mr-5">
	<h3 class="text-lg font-bold mt-8 text-red-400">Comments</h3>
	<ul>
		{#each comments as comment (comment.text)}
			<li class="bg-white p-4 mb-2 rounded-md shadow">
				<p class="text-gray-600">{comment.user}: {comment.text}</p>
			</li>
		{/each}
	</ul>
</div>

<div class="mt-4  ml-5 mr-5">
	<h3 class="text-lg font-bold mb-2 text-red-400">Add a Comment</h3>
	<form on:submit|preventDefault={submitComment}>
		<textarea
			bind:value={newComment}
			class="w-full border p-2 rounded-md"
			placeholder="Type your comment here..."
			rows="4"
		/>

		<button type="submit" class="mt-2 bg-red-400 bg-opacity-70 text-white px-4 py-2 rounded-md"
			>Submit</button
		>
	</form>
</div>
