class Link < ActiveRecord::Base
  default_scope { order("created_at") }
end
