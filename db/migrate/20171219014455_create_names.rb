class CreateNames < ActiveRecord::Migration[5.1]
  def change
    create_table :names do |t|
      t.string :name, null: false
      t.integer :user_id, default: :null
      t.text :bio

      t.timestamps
    end
  end
end
