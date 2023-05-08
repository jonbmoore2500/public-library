require "faker"

puts "🌱 Seeding public_library tables..."

neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
genres = ["Science Fiction", "Mystery", "Romance", "Thriller", "Horror", "Fantasy",
    "Historical Fiction", "Young Adult", "Biography", "Self-Help", "Academic"]

User.create(
    username: "TestingUser", neighborhood: neighborhoods[0], password: "testing", password_confirmation: "testing",
    bio: "30 year old legal analyst", fav_author: Faker::Book.author, fav_genre: genres[0]
)
3.times do
    User.create(
        username: Faker::Lorem.word, neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
        bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..10)]
    )
end
users = User.all

100.times do
    Book.create(
        user_id: users[rand(0..3)].id, title: Faker::Book.title, author: Faker::Book.author, genre: genres[rand(0..10)], num_pages: rand(50..350),
        hardback: Faker::Boolean.boolean, notes: Faker::Lorem.sentence(word_count: 10), checked_out: false, hidden: false
    )
end



puts "✅ Done seeding!"