class UsersController < ApplicationController
    wrap_parameters format: []
    before_action :authorize, only: [:show]

    def index
        users = User.all
        render json: users
    end 

    def show
        render json: @current_user
    end

    def create

    end

end
