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

    def destroy
        exchange = Exchange.find_by(id: params[:id])
        if exchange
            exchange.destroy
            head :no_content
        else
            render json: {error: "not authorized"}, status: :unauthorized
        end
    end

    def active_exchanges
        exchanges = (Exchange.all.select{|e| (e.book.user_id == @current_user.id) && (e.complete == false)} + @current_user.exchanges.select{|e| e.complete == false}).sort_by{|e| e.book.title}
        render json: exchanges, status: :created, include: {book: {only: [:title, :author, :user_id]}, user: {only: [:username]}}, methods: [:exch_status]
    end

    private
    
    def create_exch_params
        params.permit(:book_id, :approved, :received, :complete, :returned)
    end

    def update_exch_params
        params.permit(:id, :approved, :received, :complete, :returned)
    end

end 