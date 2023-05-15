class UserSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :book_id, :approved, :received, :complete, :updated_at, :exch_status
end 