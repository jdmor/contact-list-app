get '/' do
  erb :index
end

get '/api/contacts' do
  contacts = Contact.all

  if params[:search]
    contacts = contacts.search_by_name(params[:search])
  end

  contacts.to_json
end

get '/api/contacts/:id' do
  p params
  Contact.find_by(id: params[:id]).to_json
end

post '/api/contacts/new' do
  results = {result: false}

  contact = Contact.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone: params[:phone]
  )

  if contact.save!
    results[:result] = true
  end
  results.to_json
end