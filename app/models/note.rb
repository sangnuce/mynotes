class Note < ApplicationRecord
  include OrderScope

  acts_as_paranoid

  enum status: [:init, :in_progress, :delayed, :cancelled, :finished]

  validates :title, presence: true
  validates :time, presence: true
  validates :content, presence: true
  validates :status, presence: true
end
