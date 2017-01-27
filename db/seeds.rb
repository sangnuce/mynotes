25.times do
  Note.create! title: Faker::Hipster.sentence,
    time: Time.now, content: Faker::Hipster.paragraph
end
