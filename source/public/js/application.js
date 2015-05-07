$(document).ready(function() {
	$('#new_question_form').hide();
	$('#create_survey_button').hide();
	$("#create_new_question_button").on('click', function(event){
		event.preventDefault();
		$('#new_question_form').show();
		$("#create_new_question_button").hide();
		$('#create_survey_button').show();
	});

	$("#new_question_form").on('submit', function(event){
		event.preventDefault();
		$("#new_question_form").hide();
		$("#create_new_question_button").show();
		var $surveyQuestion = $(this).find("input[type='text']")

		var ajax = $.ajax({
			url: '/short_answer',
			type: 'POST',
			data: {question: $surveyQuestion.val()}
		});

		ajax.done(function(response) {
			$('#question_list').append(response)
			$surveyQuestion.val("")
		});

		$("#question_list").on("click", "#delete_question_button", function(event) {
			event.preventDefault();
			var $question = $(this).closest(".partial_question")
			debugger
			$question.remove()
		})
	});
});

