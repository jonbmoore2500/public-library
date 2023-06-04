class UserSearchedSerializer < ActiveModel::Serializer
    attributes :id, :username, :bio, :fav_author, :fav_genre, :neighborhood, :num_ex_complete 
    has_many :owned_books, serializer: BookSerializer

end