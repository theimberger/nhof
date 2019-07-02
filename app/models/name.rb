class Name < ApplicationRecord
  validates :name, :bio, presence: true, uniqueness: true
  validate :name, :blacklist_check

  private

  def blacklist_check
    excluded_names = ['adolf hitler', 'george bernard shaw', 'kim jung-un', 'jeffrey dahmer', 'charles manson']
    if excluded_names.include?(name.downcase)
      errors.add(:name, "blacklisted")
    end
  end

end
