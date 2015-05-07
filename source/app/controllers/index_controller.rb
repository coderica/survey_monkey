get '/' do
	erb :index
end

post '/short_answer' do
	if request.xhr?
		survey_question = params[:question]
		return erb :_short_answer, :layout => false, locals: {question: survey_question}
	else
		return "hello"
	end
end