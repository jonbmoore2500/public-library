class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :neighborhood, :bio, :fav_author, :fav_genre, :num_ex_complete, :owned_books

  attribute :exchanges_lend do
    lended = self.object.exchanges.joins(:book).where('exchanges.complete = ? AND books.user_id = ?', false, self.object.id)
    JSON.parse(lended.to_json(include: {book: {only: [:title, :user_id]}}, methods: [:exch_status]))
  end

  attribute :exchanges_borrow do
    borrowed = self.object.exchanges.joins(:book).where('exchanges.complete = ?', false).where.not('books.user_id = ?', self.object.id)
    JSON.parse(borrowed.to_json(include: { book: {only: [:title, :user_id]}}, methods: [:exch_status]))
  end

end
