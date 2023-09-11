class ExchangesController < ApplicationController
    wrap_parameters format: []
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unproc_entity

    def create
        exchange = @current_user.exchanges.create!(create_exch_params)
        exchange.book.update(checked_out:true)
        render json: exchange, include: ['book', 'book.owner']
    end

    def update
        exchange = Exchange.find_by(id: params[:id])
        exchange.update!(update_exch_params)
        if params[:complete]
            exchange.book.update(checked_out: false)
        end
        render json: exchange, status: :ok, include: ['book', 'book.owner', 'user']
    end

    def destroy
        exchange = Exchange.find_by(id: params[:id])
        if exchange
            exchange.book.update(checked_out: false)
            exchange.destroy
            head :no_content
        end
    end

    private
    
    def create_exch_params
        # are all these params needed? it should just need book_id and then everything else autopopulates based on schema
        params.permit(:book_id, :approved, :received, :complete, :returned, :update_read)
    end

    def update_exch_params
        params.permit(:id, :approved, :received, :complete, :returned, :update_read)
    end

    def render_unproc_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end 