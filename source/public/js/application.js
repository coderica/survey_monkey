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
		var $form = $('#question_list');//.prop('outerHTML');
		$form.find('.delete_question_button').parent().remove();
		var titleStr = $('#title_area').find('input[type="text"]').val();
		var instrucStr = $('#instructions_area').find('input[type="text"]').val();

		$.post('/form',
				{
					form: $form.prop('outerHTML'),
					title: titleStr,
					instructions: instrucStr,
					success: function() {
						window.location.href = "/";
					}
				});
	};

	var showSurvey = function(event) {
		event.preventDefault();
		var $formId = $(this).attr('id');
		$link = $(this).parent();
		$.ajax({
			url: '/forms/' + $formId,
			type: 'GET',
			data: { id: $formId },
			success: function(response) {
				$data = $.parseJSON(response);
				$survey = $('<div></div>');
				$survey.append($('<h2>Title: '+ $data.title +'</h2>'));
				$survey.append($('<h3>Instructions: '+ $data.instructions +'</h3>'));
				$survey.append($data.content);
				$link.append($survey);
			},
			error: function() {
				console.log('oops');
			}
		});
		
	}


	$("#create_new_question_button").on('click', createForm);
	$("#new_question_form").on('submit', submitForm);
	$('#question_list').on('click', "#add_answer_button", addAnswerButton);
	$('#question_list').on('click', "#remove_answer_button", removeAnswer);
	$('#create_survey_button').on('click', createSurvey);
	$('.user_survey').on('click', showSurvey);
});

