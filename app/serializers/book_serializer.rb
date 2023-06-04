class BookSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :author, :genre, :num_pages, :hardback, :notes, :checked_out, :hidden 
  belongs_to :owner, serializer: OwnerSerializer
  # need less info for owner, just id and username
end
