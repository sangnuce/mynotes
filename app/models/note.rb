class Note < ApplicationRecord
  acts_as_paranoid

  enum status: [:init, :in_progress, :delayed, :cancelled, :finished]
end
