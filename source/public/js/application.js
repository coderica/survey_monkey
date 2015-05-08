$(document).ready(function() {
	$('#new_question_form').hide();
	$('#create_survey_button').hide();

	var createForm = function(event) {
		event.preventDefault();
		$('#new_question_form').show();
		$("#create_new_question_button").hide();
		$('#create_survey_button').show();
	};

	var submitForm = function(event) {
		event.preventDefault();
		$("#remove_answer_button").hide();
		$("#new_question_form").hide();
		$("#create_new_question_button").show();
		
		var $surveyQuestion = $(this).find("input[type='text']");
		var $option = $(this).find("select").val();

		var ajax = $.ajax({
			url: '/opinion',
			type: 'POST',
			data: {question: $surveyQuestion.val(), type: $option}
		});

		ajax.done(function(response) {
			$('#question_list').append(response);
			$surveyQuestion.val("");
		});

		$("#question_list").on("click", "#delete_question_button", function(event) {
			event.preventDefault();
			var $question = $(this).closest(".partial_question");
	
			$question.remove();
		})
	};


 	var addAnswerButton = function(event) {
		event.preventDefault();
		$('#remove_answer_button').css('display', 'inline');
		var $list = $("#multiple_choice_list").find("li").last().clone();
		var $add_button = $(this);
		$add_button.hide();
		$('#multiple_choice_list').append($list);
	}

 	var removeAnswer = function(event) {
		event.preventDefault();
		var $parent_add_button = $(this).parent().prev().find("#add_answer_button");
		$parent_add_button.css("display", "inline");
		$(this).closest("li").remove();
		// var $list = $($("#multiple_choice_list").find("li")[-1]).clone()
		// $('#multiple_choice_list').append($list);
	}

	var createSurvey = function(event) {
		event.preventDefault();
		$form = $('#question_list').prop('outerHTML');
		$title = $('#title_area').prop('outerHTML');
		$instructions = $('#instructions_area').prop('outerHTML');
		console.log('hello');

		$.post('/form',
				{
					form: $form,
					title: $title,
					instructions: $instructions
				});
	};


	$("#create_new_question_button").on('click', createForm);
	$("#new_question_form").on('submit', submitForm);
	$('#question_list').on('click', "#add_answer_button", addAnswerButton);
	$('#question_list').on('click', "#remove_answer_button", removeAnswer);
	$('#create_survey_button').on('click', createSurvey);
});

