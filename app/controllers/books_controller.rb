class BooksController < ApplicationController
    wrap_parameters format: []
    before_action :authorize
    
    def index
        books = Book.all
        render json: books
    end 

    def create
        book = @current_user.owned_books.create(new_book_params)
        if book.valid?
            render json: book, status: :created
        else
            render json: {errors: book.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        book = @current_user.owned_books.find_by(id: params[:id])
        if book
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

end
