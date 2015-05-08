require 'faker'

5.times do
  User.create(
    username: Faker::Internet.user_name, 
    password: Faker::Internet.password,
    )
end

3.times do
  Form.create(
    user_id: 1,
    content: Faker::Lorem.sentence,
    )
end