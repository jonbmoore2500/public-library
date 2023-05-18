class Exchange < ApplicationRecord

    belongs_to :user
    belongs_to :book

    # validates :complete, uniqueness: {scope: :book_id}, on: :create
    # this should prevent new exchanges from being created for a book unless it has no incomplete exchanges

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

end