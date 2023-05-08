class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :neighborhood, :password_digest, :bio, :fav_author, :fav_genre, :last_login, :phone_num, :email, :books
end
