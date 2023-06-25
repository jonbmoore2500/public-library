class ConversationsController < ApplicationController
    wrap_parameters format: []
    before_action :authorize

    def index 
        conversations = Conversation.all
        render json: conversations
    end

    def show
        convo = Conversation.find_by(id: params[:id])
        render json: convo, include: :messages
    end

    def user_convos
        convos = @current_user.conversations
        render json: convos
    end

    def new_convo
        convo = Conversation.create()
        msg = convo.messages.create(recipient_id: convo_msg_params[:recipient_id], sender_id: @current_user.id, text: convo_msg_params[:text])
        if msg.valid?
            render json: convo
        else
            render json: {c_errors: convo.errors.full_messages, m_errors: msg.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def convo_msg_params
        params.permit(:recipient_id, :text)
    end

end