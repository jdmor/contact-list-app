class Contact < ActiveRecord::Base

  def self.search_by_name(term)
    term = '%' + term + '%'
    where('first_name LIKE ? OR last_name LIKE ?', term, term)
  end

end