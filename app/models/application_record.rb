class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  @@allowed_hoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
  @@allowed_genres = [
    "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action & Adventure", "Crime & Mystery", "Romance", "Humor", "Horror",
    "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non-fiction)"
    ]
end
