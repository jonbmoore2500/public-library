class UsersController < ApplicationController
    wrap_parameters format: []
    before_action :authorize, only: [:logged_user, :index, :update]

    def index
        users = User.all.select{|u| u.id != @current_user.id}
        render json: users
    end 

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, serializer: UserSearchedSerializer
        else
            render json: {error: "user not found"}, status: :unprocessable_entity
        end
    end

    def logged_user
        render json: @current_user
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

    def update
        user = User.find_by(id: params[:id])
        if user.id == @current_user.id
            user.update(update_user_params)
            if user.valid?
                render json: user
            else
                render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
            end
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

end
