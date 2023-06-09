class Book < ApplicationRecord
    belongs_to :owner, class_name: "User", foreign_key: "user_id"

    has_many :exchanges
    has_many :users, through: :exchanges

    validates :user_id, presence: true
    validates :title, presence: true
    validates :author, presence: true
    validates :genre, presence: true, inclusion: {in: @@allowed_genres}
    validates :num_pages, presence: true, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 1000} # sorry, Infinite Jest
    validates :hardback, inclusion: [true, false]
    validates :checked_out, inclusion: [true, false]
    validates :hidden, inclusion: [true, false]
    validates :notes, length: {maximum: 500}, allow_blank: true

    def complete_exchs
        self.exchanges.count {|e| e.complete && e.returned } 
    end

    def cancel_exchange
        exch = self.exchanges.find {|e| e.approved == true && e.complete == false}
        if exch
            exch.update(returned: true, complete: true)
        end
    end

    def genre_type
        return "fict" unless @@allowed_genres.slice(11, 16).include?(self.genre)
        "non_fict"
    end

end
