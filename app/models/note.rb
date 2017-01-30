class Note < ApplicationRecord
  include OrderScope

  acts_as_paranoid

  enum status: [:init, :in_progress, :delayed, :cancelled, :finished]
end
