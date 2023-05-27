class Message < ApplicationRecord
    belongs_to :s_conversation, class_name: "Conversation", foreign_key: "conversation_id"
    belongs_to :r_conversation, class_name: "Conversation", foreign_key: "conversation_id"
    belongs_to :sender, class_name: "User", foreign_key: "sender_id", required: true 
    belongs_to :recipient, class_name: "User", foreign_key: "recipient_id", required: true

    # custom validation - sender and recipient can't be the same
    # conversation has to exist
    # sender/recipient combo must match other messages in convo

end