<script>
	import { onMount } from "svelte";


    export let currentPageNumber;
    export let correctAndPossibleAnswersForQuestions;
    export let questionAnswerTemplates;
    let amountOfLoops = 0;

    let startBtnLabel = undefined;
    
    onMount( () => {
        startBtnLabel = document.getElementById("startBtnLabel");
    });

    function startQuestionnaire() {
        if (startBtnLabel !== undefined) {
            if (!(correctAndPossibleAnswersForQuestions.length == 0) && !(questionAnswerTemplates.length == 0)) {
                currentPageNumber = 2;
            } else if (amountOfLoops <= 100) {
                startBtnLabel.innerHTML = "Loading...";
                startBtnLabel.classList = "";
                amountOfLoops += 1;
                setTimeout(() => {
                    startQuestionnaire()
                }, 50);
            } else {
                startBtnLabel.innerHTML = "Loading failed, the server took too long to respond. Try reloading the page and waiting for 10 seconds before clicking the button";
                startBtnLabel.classList = "bg-red-500";
            }
        }
    }
</script>

<div>
	<div class="bg-blue-400 text-black rounded-lg">
		Begin your journey to anxiety management and inner peace by answering questions in our
		questionnaire. Identify your anxiety, vent to our AI doctor, and connect with local
		psychologists. Take the first steps toward a calmer, more serene you
	</div>

    <label for="startBtn" class="hidden" id="startBtnLabel"></label>
    <button name="startBtn" class="btn bg-blue-600 border-2" on:click={() => startQuestionnaire()}>Start quiz</button>

</div>
