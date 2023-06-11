class Book < ApplicationRecord
    belongs_to :owner, class_name: "User", foreign_key: "user_id"

    has_many :exchanges
    has_many :users, through: :exchanges

    validates :user_id, presence: true
    validates :title, presence: true
    validates :author, presence: true
    validates :genre, presence: true, inclusion: {in: @@allowed_genres}
    validates :num_pages, presence: true, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 1000}
    validates :hardback, inclusion: [true, false]
    validates :checked_out, inclusion: [true, false]
    validates :hidden, inclusion: [true, false]
    validates :notes, length: {maximum: 1000}, allow_blank: true

    # instance method, current user id argument
    def complete_exchs
        self.exchanges.count {|e| e.complete == true && e.returned == true} 
    end

end
