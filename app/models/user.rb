class User < ApplicationRecord
    has_many :owned_books, class_name: "Book" 

    has_many :exchanges
    has_many :books, through: :exchanges

    has_secure_password

    # validates :username, presence: true, uniqueness: true
    # validates :neighborhood, presence: true, inclusion: {in: @@allowed_hoods}
    # validates :phone_num, length: {is: 10}, allow_blank: true
    # validates :fav_genre, presence: true, inclusion: {in: @@allowed_genres}
end
