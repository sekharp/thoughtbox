require 'test_helper'

class CreateUserTest < ActionDispatch::IntegrationTest
  test 'guest can create user account and logout and login again' do
    visit root_path

    click_link "Sign Up"

    fill_in "Username", with: "sekharp@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    assert_equal links_path, current_path

    click_link "Logout"

    visit login_path

    fill_in "Username", with: "sekharp@gmail.com"
    fill_in "Password", with: "password"
    click_button "Login"
  end

  test 'guest cannot create second account with same username' do
    visit root_path

    click_link "Sign Up"

    fill_in "Username", with: "sekharp@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    click_link "Logout"

    visit new_user_path

    fill_in "Username", with: "sekharp@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Create Account"

    assert login_path, current_path
  end

  test 'guest cannot login with credentials that have not been registered' do
    visit login_path

    fill_in "Username", with: "sripaladugu@gmail.com"
    fill_in "Password", with: "password"
    click_button "Login"

    assert login_path, current_path
  end
end
