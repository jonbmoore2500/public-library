class ConversationsController < ApplicationController
    wrap_parameters format: []
    before_action :authorize

    def index 
        conversations = Conversation.all
        render json: conversations
        # how to include users with aliases?
    end

    def show
        convo = Conversation.find_by(id: params[:id])
        render json: convo, include: :messages
    end

    def user_convos
        convos = @current_user.conversations
        # make sure distinct
        render json: convos
    end


end