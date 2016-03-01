require 'test_helper'

class Api::LinksControllerTest < ActionController::TestCase
  def setup
    Link.create(title: "First", url: "http://www.gmail.com")
    Link.create(title: "Second", url: "http://www.msnbc.com")
    Link.create(title: "Third", url: "http://netflix.com")
  end

  test '#index returns successful response' do
    get :index, format: :json
    assert_response :success
  end

  test '#index returns an array of records' do
    get :index, format: :json
    assert_kind_of Array, json_response
  end

  test '#show responds to json' do
    get :show, format: :json, id: Link.first.id
    assert_response :success
  end

  test '#show returns one record' do
    get :show, format: :json, id: Link.first.id
    assert_kind_of Hash, json_response
  end

  test "#create responds to json" do
    get :create, format: :json, link: {title: 'title', url: 'http://www.nytimes.com'}
    assert_response :success
  end

  test "#update responds to json" do
    link = Link.create(title: 'updated title', url: 'http://www.outlook.com', read: false)
    get :update, format: :json, id: link.id, link: {title: 'updated title', url: "http://www.nytimes.com", read: true}
    assert_response :success
  end

  test "#delete responds to json" do
    put :destroy, format: :json, id: Link.last.id
    assert_response :success
  end
end
