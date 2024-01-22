class BooksController < ApplicationController
    wrap_parameters format: []
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unproc_entity

    @@genres = ["Classics", "Tragedy", "Science Fiction", "Fantasy", "Action and Adventure", "Crime and Mystery", "Romance", "Humor", "Horror","Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non fiction)"]

    def index
        books = Book.all.select{|b| (b.user_id != @current_user.id) && (!b.hidden && !b.checked_out) }
        # tests for presence in active exchange. Alternate checks checked_out status --- b.exchanges.index{|e| e.complete == false } == nil
        # want a random selection, but not re-randomized every time I request a page
        paginated_books = Kaminari.paginate_array(books).page(params[:page]).per(20)
        render json: paginated_books
    end

    def search_results
        genre_params = params[:genre]
        genre_params = @@genres.slice(0, 10)  if params[:genre] == "fict"
        genre_params = @@genres.slice(11, 16) if params[:genre] == "non_fict"
        genre_params = @@genres               if params[:genre] == ""
        books = Book.all.select{
            |b| (genre_params.include?(b.genre) && b.user_id != @current_user.id && !b.hidden) && 
            (b.title.downcase.include?(params[:text].downcase) || b.author.downcase.include?(params[:text].downcase))
        } 
        render json: books
    end

    def create
        book = @current_user.owned_books.create!(new_book_params)
        render json: book, status: :created
    end

    def update
        book = @current_user.owned_books.find_by(id: params[:id])
        if book 
            book.update!(update_book_params)
            if update_book_params[:checked_out] == false
                book.cancel_exchange 
            end
            render json: book, status: :created
        else 
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def destroy
        book = @current_user.owned_books.find_by(id: params[:id])
        if book
            if book.checked_out
                book.exchanges.last.update(complete: true)
            end
            book.destroy
            head :no_content
        else
            render json: {error: "not authorized"}, status: :unauthorized
        end
    end

    private

    def new_book_params
        params.permit(:user_id, :title, :author, :genre, :num_pages, :hardback, :hidden, :checked_out, :notes)
    end

    def update_book_params
        params.permit(:id, :title, :author, :genre, :notes, :hidden, :checked_out)
    end

    def render_unproc_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
