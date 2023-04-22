class AddScoreToNames < ActiveRecord::Migration[5.1]
  def change
    add_column :names, :score, :integer, default: 0
  end
end
