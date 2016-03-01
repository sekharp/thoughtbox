require 'test_helper'

class CreateLinkTest < ActionDispatch::IntegrationTest
  test 'authenticated user can create a link' do
    visit root_path

    click_link "Sign Up"

    fill_in "Username", with: "sekharp@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    assert_equal links_path, current_path

    fill_in 'link-title', with: 'My Link'
    fill_in 'link-url', with: 'http://www.reddit.com'
    click_button 'Create Link'
  end
end
