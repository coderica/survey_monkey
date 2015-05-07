$(document).ready(function() {
	$('#new_question').hide();
	$("#new_question_button").on('click', function(event){
		event.preventDefault();
		$('#new_question').show();
		$("#new_question_button").hide();
		$("#create_survey_button").hide();
	});

	$("#new_question").on('submit', function(event){
		event.preventDefault();
		$("#new_question").hide();
		$("#create_survey_button").show();
		$("#new_question_button").show();
		// debugger
		$('#question_list').append("<p>ajax</p>")
	});
});
	// $("#new_question_button").hide();
