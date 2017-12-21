class NamesController < ApplicationController

  def index
    render json: ["hello"], status: 200
  end

end
