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

    private

    def message_params
        params.permit(:conversation_id, :sender_id, :recipient_id, :text)
    end

end