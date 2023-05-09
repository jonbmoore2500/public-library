class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  @@allowed_hoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
  @@allowed_genres = ["Science Fiction", "Mystery", "Romance", "Thriller", "Horror", "Fantasy",
  "Historical Fiction", "Young Adult", "Biography", "Self-Help", "Academic"]
end
