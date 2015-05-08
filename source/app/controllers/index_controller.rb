get '/' do
	erb :index
end

post '/opinion' do
	if request.xhr?
		survey_question = params[:question]
		selector_option = params[:type]
		return erb :"/_#{selector_option}", :layout => false, locals: {question: survey_question}
	else
		return "hello"
	end
end

post '/form' do
	form = Form.new(
		content: params[:form],
		title: params[:title],
		instructions: params[:instructions],
		# user_id: current_user.id
	);
	if form.save
		status 200
		p 'foooooooooooooooooo'
		p 'success!!!'
	else
		status 422
	end
end

get '/form/:id' do
end