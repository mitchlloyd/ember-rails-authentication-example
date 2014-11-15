user = User.find_or_create_by(email: 'user@example.com')
user.password = 'password'
user.password_confirmation = 'password'
user.save!

if Post.count.zero?
  Post.create({
    title: "First Post",
    body: "Authenticating with buzzwords"
  })

  Post.create({
    title: "Second Post",
    body: "Authorization to the max"
  })
end
