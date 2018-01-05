class NamesController < ApplicationController

  def index
    render json: ["hello"], status: 200
  end

  def create
    debugger
  end

end
