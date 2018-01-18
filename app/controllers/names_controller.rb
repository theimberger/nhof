class NamesController < ApplicationController

  def index
    @names = Name.all
    @names = @names.sort_by {|name| name.id }
    @names.reverse!
    render 'index'
  end

  def create
    name = Name.new(name_params)

    if name.save!
      @name = name
      render 'names/show', format: :json
    else
      render :json, ["Already submitted"]
    end

  end

  def name_params
    params.permit(:name, :bio)
  end

end
