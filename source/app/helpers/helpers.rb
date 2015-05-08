helpers do

	def login(user)
		session[:id] = user.id
	end

	def logged_in?
		!!current_user
	end

	def current_user
		@current_user ||= User.find(session[:id]) if session[:id]
	end

	def logout
		session[:id] = nil
	end

end