class Name < ApplicationRecord
  validates :name, :bio, presence: true, uniqueness: true


end
