class User < ApplicationRecord
    has_many :owned_books, class_name: "Book" 

    has_many :exchanges
    has_many :books, through: :exchanges

    has_many :messages, class_name: "Message", foreign_key: "sender_id"
    has_many :messages, class_name: "Message", foreign_key: "recipient_id"
    # has_many :s_messages, class_name: "Message", foreign_key: "sender_id"
    # has_many :r_messages, class_name: "Message", foreign_key: "recipient_id"

    has_many :conversations, through: :messages
    # has_many :conversations, through: :s_messages
    # has_many :conversations, through: :r_messages

    # can only get a convo if both sent and received a message. fixed with custom serializer method, kind of janky

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, length: {minimum: 5, maximum: 20}, on: :create
    validates :neighborhood, presence: true, inclusion: {in: @@allowed_hoods}
    validates :phone_num, length: {is: 10}, allow_blank: true
    validates :email, allow_blank: true, uniqueness: true
    validates :fav_genre, presence: true, inclusion: {in: @@allowed_genres}
    validates :fav_author, presence: true

    # def messages 
    #     Message.all.select{|m| m.sender_id == self.id || m.recipient_id == self.id}
    # end

    def num_ex_complete
        self.exchanges.count{|e| e.complete == true}
    end

    # def exchanges_borrow
    #     exchanges = self.exchanges.select{|e| e.complete == false}.sort_by{|e| e.book.title}
    # end

    # def exchanges_lend
    #     exchanges = Exchange.all.select{|e| (e.book.user_id == self.id) && (e.complete == false)}.sort_by{|e| e.book.title}
    # end

end
