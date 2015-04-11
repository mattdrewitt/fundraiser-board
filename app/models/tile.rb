class Tile < ActiveRecord::Base
  belongs_to :board

  def self.ordered
    order('tiles.order')
  end
end
