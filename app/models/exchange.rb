class Exchange < ApplicationRecord

    belongs_to :user
    belongs_to :book

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