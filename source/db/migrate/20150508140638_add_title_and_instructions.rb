class AddTitleAndInstructions < ActiveRecord::Migration
  def change
  	add_column :forms, :title, :string
  	add_column :forms, :instructions, :string
  end
end
