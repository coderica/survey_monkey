get '/' do
	@user = current_user if logged_in?
	erb :index
end

get '/surveys/new' do
	erb :create_surveyf
end

get '/form/:id' do
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
		user_id: current_user.id
	);
	if form.save
		status 200
		p 'foooooooooooooooooo'
		p 'success!!!'
	else
		status 422
	end
end

post '/login' do
	@user = User.where(username: params[:username]).first
	if @user.password == params[:password]
		status 200
		login(@user)
	else
		status 404
	end
	redirect '/'
end

post '/users' do
	@user = User.create(username: params[:username], password: params[:password])
	redirect '/'
end

delete '/logout' do
	logout
	redirect '/'
end

