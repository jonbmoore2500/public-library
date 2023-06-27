class UsersController < ApplicationController
    wrap_parameters format: []
    before_action :authorize, only: [:logged_user, :index, :update]
    rescue_from ActiveRecord::RecordInvalid, with: :render_unproc_entity

    def logged_user
        render json: @current_user
    end

    def index
        users = User.all.select{|u| u.id != @current_user.id}
        render json: users
    end 

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, serializer: UserSearchedSerializer
        else
            render json: {error: "user not found"}, status: :not_found
        end
    end

    def create
        user = User.create!(create_user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find_by(id: params[:id])
        if user.id == @current_user.id
            user.update!(update_user_params)
            render json: user
        else
            render json: {error: "must be logged in"}, status: :unauthorized
        end
    end

    private

    def create_user_params
        params.permit(:username, :neighborhood, :password, :password_confirmation, :bio, :fav_genre, :fav_author, :phone_num, :email)
    end

    def update_user_params
        params.permit(:id, :bio, :neighborhood, :fav_author, :fav_genre)
    end

    def render_unproc_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
