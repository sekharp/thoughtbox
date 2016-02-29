class LinksController < ApplicationController
  before_action :require_login

  def index
  end

  def require_login
    unless current_user
      redirect_to login_path
    end
  end
end
