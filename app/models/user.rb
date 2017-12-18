class User < ApplicationRecord

  after_intialize: :ensure_session_token

  validates: :username, :password_digest, :session_token, presence: true
  validates: :username, uniquness: true
  validates: :password, length: {minimum: 8, allow_nil: true}

  attr_reader :password

  has_many :names,
    class_name: :Name,
    foreign_key: :user_id

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def password(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

end
