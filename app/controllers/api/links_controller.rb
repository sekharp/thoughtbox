class Api::LinksController < ApplicationController
  respond_to :json

  def index
    respond_with Link.all
  end

  def show
    respond_with Link.find(params[:id])
  end

  def create
    respond_with Link.create(link_params), location: nil
  end

  def destroy
    respond_with Link.destroy(params[:id])
  end

  def update
    @link = Link.find(params[:id]).update(link_params)
    respond_with @link, json: @link, location: nil
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end
end
