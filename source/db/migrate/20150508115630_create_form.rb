class CreateForm < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.belongs_to :user
      t.string :content

      t.timestamp
    end
  end
end