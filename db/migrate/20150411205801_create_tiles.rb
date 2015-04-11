class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.string :title
      t.string :person
      t.integer :order
      t.integer :board_id

      t.timestamps null: false
    end
  end
end
