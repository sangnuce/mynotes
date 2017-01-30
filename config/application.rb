require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mynotes
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.time_zone = "Hanoi"
    I18n.config.enforce_available_locales = true
    config.i18n.available_locales = [:en]
    config.i18n.default_locale = :en
    config.middleware.use I18n::JS::Middleware
  end
end
