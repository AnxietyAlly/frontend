<script>

    export let currentPageNumber;

    function startQuestionnaire() {
        currentPageNumber = 2;
    }
</script>

    <div class="h-20 mt-4 space-y-6">
        <div class="flex justify-center">
            <div class="w-3/4 md:w-1/2 lg:w-1/4 bg-white bg-opacity-50 p-4">
                <p class="text-xs text-center text-stone-600 italic">
                    "Begin your journey to anxiety management and inner peace by answering questions in our questionnaire. 
                     Identify your anxiety, vent to our AI doctor, and connect with local psychologists. 
                     Take the first steps toward a calmer, more serene you."
                </p>
            </div>
        </div>
    </div>

    <div class="h-20 mt-12 space-y-6">
        <div class="flex justify-center">
            <button
                type="submit"
                class="btn w-30 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-3xl shadow col-span-2 bg-red-400 bg-opacity-70 text-white md:py-4 md:text-lg md:px-10"
                on:click={() => startQuestionnaire()}>
                Start quiz
            </button>
        </div>
    </div>
    <!-- <button class="btn bg-blue-600 border-2" on:click={() => startQuestionnaire()}>Start quiz</button> -->

