class FollowsController < ApplicationController
    wrap_parameters format: []
    before_action :authorize

    def create
        follow = @current_user.follows.create!(follow_params)
        render json: follow, status: :created
    end

    def destroy
        follow = Follow.find_by(id: params[:id], user: @current_user)
        if follow 
            follow.destroy
            head :no_content 
        else 
            render json: {error: "not authorized or follower not found"}, status: :unauthorized
        end 
    end 


    private

    def follow_params
        params.permit(:user_id, :followed_id)
    end

end