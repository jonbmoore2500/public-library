class MessagesController < ApplicationController
    wrap_parameters format: []
    before_action :authorize

    def index 
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.create(message_params)
        if message.valid?
            render json: message, status: :created
        else
            render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def new_message
        # message = @current_user.s_messages.create(message_params) - doesn't work, says sender must exist. this works in postman, but not in webapp
        message = Message.create(sender_id: @current_user.id, recipient_id: message_params[:recipient_id], conversation_id: message_params[:conversation_id], text: message_params[:text]) #works, less than ideal.
        if message.valid?
            render json: message, status: :created
        else
            render json: {errors: message.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def message_params
        params.permit(:conversation_id, :sender_id, :recipient_id, :text)
    end

end