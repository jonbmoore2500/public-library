class BookSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :author, :genre, :num_pages, :hardback, :notes, :checked_out, :hidden, :owner
  # need less info for owner, just id and username
end
