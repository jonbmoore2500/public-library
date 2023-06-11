class ExchangesController < ApplicationController
    wrap_parameters format: []
    before_action :authorize

    def index
        exchanges = Exchange.all
        render json: exchanges
    end 

    def show
        exchange = Exchange.find_by(id: params[:id])
        render json: exchange, include: :book
    end 

    def create
        exchange = @current_user.exchanges.create(create_exch_params)
        if exchange.valid?
            exchange.book.update(checked_out:true)
            render json: exchange, include: ['book', 'book.owner']
        else
            render json: {errors: exchange.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        exchange = Exchange.find_by(id: params[:id])
        # byebug
        exchange.update(update_exch_params)
        if params[:complete]
            exchange.book.update(checked_out: false)
        end
        render json: exchange, include: ['book', 'book.owner', 'user']
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

    private
    
    def create_exch_params
        params.permit(:book_id, :approved, :received, :complete, :returned)
    end

    def update_exch_params
        params.permit(:id, :approved, :received, :complete, :returned)
    end

end 