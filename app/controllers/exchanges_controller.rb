class BooksController < ApplicationController

    def index
        exchanges = Exchange.all
        render json: exchanges
    end 

    def show
        exchange = Exchange.find_by(id: params[:id])
        render json: exchange
    end 

end 