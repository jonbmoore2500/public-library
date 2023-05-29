class UsersController < ApplicationController
    wrap_parameters format: []
    before_action :authorize, only: [:logged_user, :index]

    def index
        users = User.all.select{|u| u.id != @current_user.id}
        render json: users
    end 

    def show
        user = User.find_by(id: params[:id])
        # byebug
        if user
            render json: user
        else
            render json: {error: "user not found"}, status: :unprocessable_entity
        end
    end

    def logged_user
        render json: @current_user, include: {conversations: {include: :messages}}
    end

    def create
        user = User.create(create_user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def create_user_params
        params.permit(:username, :neighborhood, :password, :password_confirmation, :bio, :fav_genre, :fav_author, :phone_num, :email)
    end

end
