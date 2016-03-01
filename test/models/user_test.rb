require 'test_helper'

class UserTest < ActiveSupport::TestCase
  valid_params = {username: "beyonce@gmail.com",
                  password: "putaringonit",
                  password_confirmation: "putaringonit"}

  test "it is valid with correct params" do
    user = User.new(valid_params)
    assert user.valid?
  end
end
