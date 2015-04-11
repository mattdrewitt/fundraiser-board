class BoardsController < ApplicationController
  def create
    @board = Board.build_new(params[:board][:title])

    if @board.valid?
      redirect_to board_path(@board)
    else
      root_path
    end
  end

  def show
    @board = Board.find(params[:id])
  end

  def update
    @board = Board.find(params[:id])
    @board.tiles.find_by(order: params[:order]).update_attributes(person: params[:person])
    render nothing: true
  end
end