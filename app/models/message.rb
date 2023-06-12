class Message < ApplicationRecord
    belongs_to :s_conversation, class_name: "Conversation", foreign_key: "conversation_id"
    belongs_to :r_conversation, class_name: "Conversation", foreign_key: "conversation_id"
    belongs_to :sender, class_name: "User", foreign_key: "sender_id", required: true 
    belongs_to :recipient, class_name: "User", foreign_key: "recipient_id", required: true

    validates :text, length: { minimum: 1, maximum: 200 }
    validates :s_conversation, presence: true

    validate :diff_s_and_r
    validate :match_other_messages, if: :convo_has_messages?

    def diff_s_and_r
        errors.add(:recipient, "can't match sender") if sender == recipient
    end

    def convo_has_messages?
        self.s_conversation.messages.length > 0
    end

    def match_other_messages
        check_arr = [{id: sender.id, username: sender.username}, {id: recipient.id, username: recipient.username}].sort_by { |x| x[:id] }
        errors.add(:s_conversation, "this is the wrong conversation!") unless s_conversation.two_users == check_arr
    end

end