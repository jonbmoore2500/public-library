class User < ApplicationRecord
    has_many :owned_books, class_name: "Book" 

    has_many :exchanges
    has_many :books, through: :exchanges

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: {minimum: 5, maximum: 20}, on: :create
    validates :neighborhood, presence: true, inclusion: {in: @@allowed_hoods}
    validates :phone_num, length: {is: 10}, allow_blank: true
    validates :email, allow_blank: true, uniqueness: true
    validates :fav_genre, presence: true, inclusion: {in: @@allowed_genres}
    validates :fav_author, presence: true

    def num_ex_complete
        self.exchanges.count{|e| e.complete == true}
    end

    def active_exchanges
        exchanges = self.exchanges.select{|e| e.complete == false}
    end

end
