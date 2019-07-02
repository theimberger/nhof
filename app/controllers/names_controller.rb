class NamesController < ApplicationController

  def index
    @names = Name.all
    @names = @names.sort_by {|name| name.id }
    @names.reverse!
    render 'index'
  end

  def create
    name = Name.new(name_params)

    if name.valid? && name.save!
      @name = name
      render 'names/show', format: :json
    else
      if name.errors.full_messages[0].include?('blacklisted')
        render json: {type: 'blacklisted', status: 422}, status: 422
      else
        render json: {type: 'already submitted', status: 422}, status: 422
      end
    end

  end

  def name_params
    params.permit(:name, :bio)
  end

end
