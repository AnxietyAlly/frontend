<script>
	import { browser } from '$app/environment';

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
			console.error("Error: ", err);
		}
	}

	
	let questionsFromDatabase = [];
	if (browser) {
		window.addEventListener('load', function () {
			getApiData('http://localhost:3010/questionnaireApi/questionnaire/questions') //
			.then((questionLinksJSON) => {
				const questionLinks = questionLinksJSON.data
				for (let i = 0; i < questionLinks.length; i++) {
					getApiData(`http://localhost:3010/questionnaireApi${questionLinks[i]}`) //
					.then((question) => {
						questionsFromDatabase.push(question);
					});
				};
			});
		});
	}

	let questions = [
		{
			"question": "Question 1: How often do you feel a sense of excessive worry or fear without a specific cause.",
			"options": [
				"Frequently",
				"Never",
				"Not Often",
				"Sometimes"
			],
			"correctIndex": 3
		},
		{
			"question": "Question 2: Do you often feel tense or anxious? For example, during a specific situation or when you're about to go to sleep.",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 3
		},
		{
			"question": "Question 3: Do you avoid certain situations because of your fears? ",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 1
		},
		{
			"question": "Question 4: Do you worry? For example, about what others think of you in certain situations?",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 1
		},
		{
			"question": "Question 5: Do you avoid social gatherings because of fear, anxiety, or nervousness?",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 2
		},
		{
			"question": "Question 6: How often have you had a panic attack in the past month?",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 1
		},
		{
			"question": "Question 7: How often have you had a panic attack in the past month?",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 3
		},
		{
			"question": "Question 8: Do you experience physical symptoms such as shortness of breath, sweating, restlessness, tingling, or nausea?",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 1
		},
		{
			"question": "Question 9: Do you have episodes of anxiety and fear that you can't seem to control?",
			"options": [
				"Frequently",
				"Never",
				"Not often",
				"Sometimes"
			],
			"correctIndex": 0
		}	
	];
	let answers = new Array(questions.length).fill(null);
	let questionPointer = -1;
	function getScore() {
    let score = answers.reduce((acc, val, index) => {
        if (questions[index].correctIndex === val) {
            return acc + 1;
        }
        return acc;
    }, 0);
    return ((score / questions.length) * 100).toFixed(2) + "%";
}
	function restartQuiz(){
		answers = new Array(questions.length).fill(null);
		questionPointer = 0;
	}
</script>
<div class="min-h-screen bg-sky flex flex-col items-center">
    <img class="w-40 h-100 z-10" src="/anxietyAllyLogo.png" alt="Anxiety Ally Logo">
<!--This is the start screen, probably not going to use it-->
<div class="app top-0">
	{#if questionPointer==-1}
			
	<div class="bg-blue-400 text-black rounded-lg w-20">
		Begin your journey to anxiety management and inner peace by answering questions in our questionnaire.
		Identify your anxiety, vent to our AI doctor, and connect with local psychologists. Take the first steps toward a calmer, more serene you
	</div>
	
<button class="bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 ml-36 h-14 w-24 mt-36" on:click={()=>{questionPointer=0}}>
	Start Quiz
</button>
		
<!--These are the quiz screens with the questions-->
	{:else if !(questionPointer > answers.length-1)}
		<div class="quiz-screen p-50 bg-sky flex-wrap w-45 border-radius-20 my-10 bg-blue-400 text-black fixed bottom-0 left-0 w-full flex justify-between items-center w-150 h-10 rounded-10 overflow-hidden">
			
			<div class="main p-4 flex justify-between flex-wrap mx-auto rounded-lg mt-12 bg-blue-400 text-black h-56 absolute">		
					
				<h2>
					{questions[questionPointer].question}
				</h2>
				<div class="options flex justify-between flex-wrap w-45 border-radius-20 my-10 bg-blue-400 text-black">
					{#each questions[questionPointer].options as opt,i}
						<button class="{answers[questionPointer]==i?'selected':''} px-10 py-2 bg-blue-500 text-black rounded-full focus:outline-none w-45 border-radius-20 my-10" on:click={()=>{answers[questionPointer]=i}}>
							{opt}	
						</button>
					{/each}
				</div>
				<h1>More information on this topic?</h1>
			</div>
<!--this is the footer with back and forward button-->
			<div class="footer bg-blue-400 fixed bottom-0 left-0 w-full h-16 flex justify-between items-center w-150 rounded-10 overflow-hidden">
				<div class="progress-bar w-150 bg--400 rounded-10 overflow-hidden h-full bg-purple-200">
					<div style="width:{questionPointer/questions.length *100}%">
					</div>
				</div>
				<div class="buttons">
					<button class="px-10 py-2 bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 my-10" disabled={questionPointer==0} on:click={()=>{questionPointer--}}>
						&lt;
					</button>
					<button class="px-10 py-2 bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 my-10" on:click={()=>{questionPointer++}}>
						&gt;
					</button>
				</div>
			</div>
		</div>
		<!-- this is the score page -->
		{:else}
		<div class="score-screen bg-blue-400 text-black rounded-lg w-20 mt-10">
			After completing this test, it seems you might have some symptoms related to:
		</div>
	
		<div class="score-container flex flex-col items-center mt-4">
			<div class="score bg-blue-500 text-white rounded-full flex items-center justify-center">
				Social Anxiety with a score of: {getScore()}
			</div>
			<button class="bg-blue-500 text-white rounded-full focus:outline-none w-45 border-radius-20 ml-7 h-14 w-24 mt-36" on:click={restartQuiz}>
				Restart Quiz
			</button>
		</div>
	{/if}
	
</div>
</div>
<style>
      .bg-sky {
      background-image: url("/background-sky.png");
      background-position: center;
    }

    .app > div {
		width:100%;
		height:100%;
	}

    button.selected{
        background:aliceblue;
		color: black;
    }

    /* .app .quiz-screen .footer > div {
		margin:0px 10px;
	} */

</style>