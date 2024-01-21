class Follow < ApplicationRecord

    belongs_to :user 
    belongs_to :followed, class_name: "User", foreign_key: "followed_id", required: true

    validate :self_follow
    validate :repeat_follow

    private
    
    def self_follow
        errors.add(:base, "can't follow yourself") if user == followed
    end 

    def repeat_follow
        existing_follow = Follow.find_by(user: user, followed: followed)
        errors.add(:base, "user is already being followed") if existing_follow.present?
    end
end 