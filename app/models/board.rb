class Board < ActiveRecord::Base
  has_many :tiles, dependent: :destroy
  def self.next_tile_time
    @time = {hour: 3, min: 0} if @time.blank?
    return_time = @time.clone
    @time[:min] += 2
    if @time[:min] >= 60
      @time[:hour] += 1
      @time[:min] = 0
    end

    return return_time;
  end

  def self.build_new(title)
    options = []
    start_time = self.next_tile_time
    (1..97).each do |i|
      end_time = self.next_tile_time
      options << Tile.new(title: "#{start_time[:hour]} hrs & #{start_time[:min]} mins - #{end_time[:hour]} hrs & #{end_time[:min]} mins", order: i)
      start_time = end_time
    end
    options << Tile.new(title: 'Under 3 hrs', order: 98)
    options << Tile.new(title: 'Over 6 hrs and 14 mins', order: 99)
    options << Tile.new(title: 'DNF', order: 100)

    return Board.create(title: title, tiles: options)
  end
end
