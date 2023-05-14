class ExchangesController < ApplicationController
    before_action :authorize

    def index
        exchanges = Exchange.all
        render json: exchanges
    end 

    def show
        exchange = Exchange.find_by(id: params[:id])
        render json: exchange
    end 

    def create
        exchange = @current_user.exchanges.create(create_exch_params)
        render json: exchange
    end

    def update
        exchange = Exchange.find_by(id: params[:id])
        exchange.update(update_exch_params)
        render json: exchange
    end

    def active_exchanges
        lent_books = Exchange.all.select{|e| (e.book.user_id == @current_user.id) && (e.complete == false)}
        borrowed_books = @current_user.exchanges.select{|e| e.complete == false}
        render json: {lent: lent_books, borrowed: borrowed_books}, status: :created 
    end

    private
    
    def create_exch_params
        params.permit(:book_id, :approved, :received, :complete)
    end

    def update_exch_params
        params.permit(:id, :approved, :received, :complete)
    end

end 