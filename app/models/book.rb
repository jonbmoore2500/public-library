class Book < ApplicationRecord
    belongs_to :owner, class_name: "User", foreign_key: "user_id"

    has_many :exhanges
    has_many :users, through: :exchanges

    # validates :user_id, presence: true
    # validates :title, presence: true
    # validates :author, presence: true
    # validates :genre, presence: true, inclusion: {in: @@allowed_genres}
    # validates :num_pages, presence: true, numericality: {greater_than_or_equal_to: 1, less_than_or_equal_to: 1000}


end
