require 'uri'
class Link < ActiveRecord::Base
  default_scope { order("created_at") }
  validates :url, :format => URI::regexp(%w(http https))
end
