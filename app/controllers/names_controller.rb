class NamesController < ApplicationController

  def index
    render json: ["hello"], status: 200
  end

  def create
    name = Name.new(name_params)

    if name.save!
    else
      render :json, ["Already submitted"]
    end

  end

  def name_params
    params.permit(:name, :bio)
  end

end
