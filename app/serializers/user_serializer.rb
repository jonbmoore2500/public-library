class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :neighborhood, :bio, :fav_author, :fav_genre, :num_ex_complete, :num_lend_complete
  has_many :owned_books, serializer: BookSerializer
  # has_many :followings, serializer: FollowSerializer

  def owned_books
      object.owned_books.order(:id)
  end

  # def followings
  #     object.followed_users
  # end 

  attribute :exchanges_lend do
    lended = Exchange.joins(:book).where('exchanges.complete = ? AND books.user_id = ?', false, self.object.id).order(id: :asc)
    JSON.parse(lended.to_json(include: { book: {only: [:title, :author]}, user: {only: [:username, :id]}}, methods: [:exch_status]))
  end

  attribute :exchanges_borrow do
    borrowed = self.object.exchanges.joins(:book).where('exchanges.complete = ?', false).where.not('books.user_id = ?', self.object.id).order(id: :asc)
    JSON.parse(borrowed.to_json(include: { book: {include: {owner: {only: [:username, :id]}}, only: [:title, :author]}}, methods: [:exch_status]))
  end

  attribute :convos do
    conversations = (self.object.s_conversations + self.object.r_conversations).uniq
    sorted_convos = conversations.map do |c|
      {
        id: c.id,
        messages: c.messages.order(id: :asc),
        two_users: c.two_users
      }
    end
    sorted_convos
  end

end
