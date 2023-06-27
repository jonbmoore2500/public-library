class Exchange < ApplicationRecord
    belongs_to :user
    belongs_to :book

    validates :complete, uniqueness: {scope: :book_id}, on: :create # can't request an exchange for a book until all previous exchanges are complete
    validates :book_id, presence: true

    def exch_status
        if self.complete
            "complete"
        elsif self.returned
            "returned"
        elsif self.received
            "received"
        elsif self.approved
            "approved"
        else
            "requested"
        end
    end     

    def title_author
        "#{self.book.title}, by #{self.book.author}"
    end

end