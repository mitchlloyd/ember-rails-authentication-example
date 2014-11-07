user = User.find_or_create_by(email: 'user@example.com')
user.password = 'password'
user.password_confirmation = 'password'
user.save!
