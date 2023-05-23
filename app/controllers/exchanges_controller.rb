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
            render json: exchange
        else
            render json: {errors: exchange.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        exchange = Exchange.find_by(id: params[:id])
        exchange.update(update_exch_params)
        render json: exchange, include: {book: {only: [:title, :author, :user_id]}, user: {only: [:username]}}, methods: [:exch_status]
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

    # def active_exchanges
    #     exchanges = (Exchange.all.select{|e| (e.book.user_id == @current_user.id) && (e.complete == false)}
    #      + @current_user.exchanges.select{|e| e.complete == false}).sort_by{|e| e.book.title}
    #     render json: exchanges, status: :created, include: {book: {only: [:title, :author, :user_id]}, user: {only: [:username]}}, methods: [:exch_status]
    # end
    # # include in user context, split into lent and borrowed sets due to lack of relationship between the two

    private
    
    def create_exch_params
        params.permit(:book_id, :approved, :received, :complete, :returned)
    end

    def update_exch_params
        params.permit(:id, :approved, :received, :complete, :returned)
    end

end 