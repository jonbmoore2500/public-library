class MessagesController < ApplicationController
    wrap_parameters format: []
    before_action :authorize    
    rescue_from ActiveRecord::RecordInvalid, with: :render_unproc_entity

    # def index 
    #     messages = Message.all
    #     render json: messages
    # may create separate fetch and context for messages at later date
    # end

    def create
        message = @current_user.s_messages.create!(message_params) 
        render json: message, status: :created
    end

    def update
        message = Message.find_by(id: update_params[:id])
        message.update!(update_params)
        render json: message, status: :ok
    end

    private

    def message_params
        params.permit(:conversation_id, :sender_id, :recipient_id, :text)
    end

    def update_params 
        params.permit(:id, :msg_read)
    end 

    def render_unproc_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end