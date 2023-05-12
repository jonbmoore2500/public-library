class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :neighborhood, :password_digest, :bio, :fav_author, :fav_genre, :num_ex_complete, :owned_books
end
