class UserSearchedSerializer < ActiveModel::Serializer
    attributes :id, :username, :bio, :fav_author, :fav_genre, :neighborhood, :num_ex_complete 
    has_many :owned_books, serializer: BookSerializer

    def owned_books
        object.owned_books.select{|b| !b[:hidden]}.sort_by{|b| b[:id]}
    end

end