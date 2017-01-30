module OrderScope extend ActiveSupport::Concern
  module ClassMethods
    def order_desc column
      order column => :desc
    end
  end
end
