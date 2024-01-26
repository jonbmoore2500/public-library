class FollowSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :followed_id, :followed_username

    def followed_username
        object.followed.username
    end 
end 