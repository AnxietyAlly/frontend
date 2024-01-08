<script>
	export let data;
</script>

<div class="flex flex-col items-center mt-4">
    <img class="w-40 h-40 md:w-60 md:h-60 lg:w-52 mt-4" src="/anxietyally.png" alt="Anxiety Ally Logo" />
</div>
<div class="h-10 mt-2 flex justify-center">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 text-opacity-90">Welcome *user*</h1>
</div>

<div class="text-center mx-auto mt-2"> <!-- Adjusted margin-top -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center">
        <a href="/dailycheckup" class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2">
            <h2 class="text-center text-lg md:text-xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                Daily Checkup
            </h2>
        </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-1 lg:flex lg:items-center lg:justify-center">
        <a href="/progress" class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2">
            <h2 class="text-center text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                Progress
            </h2>
        </a>
    </div>    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-1 justify-center lg:flex lg:items-center lg:justify-center"> <!-- Adjusted margin -->
        <a href="/articles" class="rounded-xl bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-1 lg:bg-gray-300 p-4 lg:w-1/2">
            <h2 class="text-center text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                Articles
            </h2>
        </a>
    </div>
  <div class="grid grid-cols-3 gap-4 my-2 mx-5">
		<a
			href="/dashboard"
			class="rounded-xl col-span-3 bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-2"
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Robodoc
			</h2>
		</a>
	</div>
	<div class="grid grid-cols-3 gap-4 my-2 mx-5">
		<a
			href="/logout"
			class="rounded-xl col-span-3 bg-gradient-to-r from-red-400 to-red-300 flex items-center justify-center h-16 m-2"
			data-sveltekit-preload-data="off"
    		data-sveltekit-reload
		>
			<h2
				class="text-center text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
			>
				Log out
			</h2>
		</a>
	</div>
</div>

