require "faker"

puts "🌱 Seeding public_library tables..."

neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
genres = [
    "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action and Adventure", "Crime and Mystery", "Romance", "Humor", "Horror",
    "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non fiction)"
    ]

User.create(
    username: "TestingUser1", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser2", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser3", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser4", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser5", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser6", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser7", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
User.create(
    username: "TestingUser8", neighborhood: neighborhoods[rand(0..8)], password: "testing", password_confirmation: "testing",
    bio: Faker::Lorem.sentence(word_count: 10), fav_author: Faker::Book.author, fav_genre: genres[rand(0..15)]
)
users = User.all

200.times do
    Book.create(
        user_id: users[rand(0..3)].id, title: Faker::Book.title, author: Faker::Book.author, genre: genres[rand(0..15)], num_pages: rand(50..350),
        hardback: Faker::Boolean.boolean, notes: Faker::Lorem.sentence(word_count: 10), checked_out: false, hidden: false
    )
end
100.times do 
    Book.create(
        user_id: users[rand(4..7)].id, title: Faker::Book.title, author: Faker::Book.author, genre: genres[rand(0..15)], num_pages: rand(50..350),
        hardback: Faker::Boolean.boolean, notes: Faker::Lorem.sentence(word_count: 10), checked_out: false, hidden: false
    )
end

# byebug
books = Book.all
books0 = Book.all.select {|b| b.user_id == users[0].id}
books1 = Book.all.select {|b| b.user_id == users[1].id}
books2 = Book.all.select {|b| b.user_id == users[2].id}
books3 = Book.all.select {|b| b.user_id == users[3].id}

rand_num = rand(0..9)
Exchange.create(user_id: users[0].id, book_id: books1[rand_num].id, approved: true, received: false, returned: false, complete: false)
Book.find(books1[rand_num].id).update(checked_out: true)

rand_num = rand(0..9)
Exchange.create(user_id: users[0].id, book_id: books2[rand_num].id, approved: false, received: false, returned: false, complete: false)
Book.find(books2[rand_num].id).update(checked_out: true)

rand_num = rand(10..19)
Exchange.create(user_id: users[0].id, book_id: books1[rand_num].id, approved: false, received: false, returned: false, complete: true)

rand_num = rand(0..9)
Exchange.create(user_id: users[0].id, book_id: books3[rand_num].id, approved: true, received: true, returned: false, complete: false)
Book.find(books3[rand_num].id).update(checked_out: true)


rand_num = rand(0..9)
Exchange.create(user_id: users[1].id, book_id: books0[rand_num].id, approved: true, received: true, returned: true, complete: false)
Book.find(books0[rand_num].id).update(checked_out: true)

rand_num = rand(10..19)
Exchange.create(user_id: users[1].id, book_id: books2[rand_num].id, approved: true, received: true, returned: true, complete: true)

rand_num = rand(20..29)
Exchange.create(user_id: users[1].id, book_id: books2[rand_num].id, approved: false, received: false, returned: false, complete: true)

rand_num = rand(10..19)
Exchange.create(user_id: users[1].id, book_id: books0[rand_num].id, approved: false, received: false, returned: false, complete: false)
Book.find(books0[rand_num].id).update(checked_out: true)


rand_num = rand(10..19)
Exchange.create(user_id: users[2].id, book_id: books3[rand_num].id, approved: true, received: true, returned: false, complete: false)
Book.find(books3[rand_num].id).update(checked_out: true)

rand_num = rand(20..29)
Exchange.create(user_id: users[2].id, book_id: books1[rand_num].id, approved: true, received: false, returned: false, complete: false)
Book.find(books1[rand_num].id).update(checked_out: true)

rand_num = rand(30..39)
Exchange.create(user_id: users[2].id, book_id: books0[rand_num].id, approved: false, received: false, returned: false, complete: false)
Book.find(books0[rand_num].id).update(checked_out: true)


exchs = Exchange.all
exchs.each {|e| e.book.update(checked_out: true) if (e[:complete] == false)}

3.times do
    Conversation.create()
end
convos = Conversation.all 

# convo between 0 and 1, first
2.times do 
    Message.create(
        conversation_id: convos[0].id, sender_id: users[0].id, recipient_id: users[1].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
2.times do 
    Message.create(
        conversation_id: convos[0].id, sender_id: users[1].id, recipient_id: users[2].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
2.times do 
    Message.create(
        conversation_id: convos[0].id, sender_id: users[0].id, recipient_id: users[1].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end

# convo between 0 and 2, second
2.times do 
    Message.create(
        conversation_id: convos[1].id, sender_id: users[0].id, recipient_id: users[2].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
3.times do 
    Message.create(
        conversation_id: convos[1].id, sender_id: users[2].id, recipient_id: users[0].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
2.times do 
    Message.create(
        conversation_id: convos[1].id, sender_id: users[0].id, recipient_id: users[2].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
2.times do 
    Message.create(
        conversation_id: convos[1].id, sender_id: users[2].id, recipient_id: users[0].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end

# convo between 1 and 3, third
2.times do 
    Message.create(
        conversation_id: convos[2].id, sender_id: users[1].id, recipient_id: users[3].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
4.times do 
    Message.create(
        conversation_id: convos[2].id, sender_id: users[3].id, recipient_id: users[1].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end
2.times do 
    Message.create(
        conversation_id: convos[2].id, sender_id: users[1].id, recipient_id: users[3].id, text: Faker::Lorem.sentence(word_count: 10)
    )
end


puts "✅ Done seeding!"