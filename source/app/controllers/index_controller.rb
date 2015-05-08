get '/' do
	erb :index
end

post '/short_answer' do
	if request.xhr?
		survey_question = params[:question]
		selector_option = params[:type]
		case selector_option
		when "five_star" 
			return erb :_five_star, :layout => false, locals: {question: survey_question}		
		when "yes_no" 
			return erb :_yes_no, :layout => false, locals: {question: survey_question}			
		when "true_false" 
			return erb :_true_false, :layout => false, locals: {question: survey_question}
		when "multiple_choice"
			return erb :_multiple_choice, :layout => false, locals: {question: survey_question}		
		when "one_to_five"
			return erb :_one_to_five, :layout => false, locals: {question: survey_question}
		else
			return erb :_short_answer, :layout => false, locals: {question: survey_question}
		end
	else
		return "hello"
	end
end