class Conversation < ApplicationRecord
    has_many :messages
    has_many :users, through: :messages

    def two_users
        a = self.messages.first.sender
        b = self.messages.first.recipient
        users_arr = [{id: a.id, username: a.username}, {id: b.id, username: b.username}].sort_by { |x| x[:id] }
    end

end