get '/' do
  erb :index
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